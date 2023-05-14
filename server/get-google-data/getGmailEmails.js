const axios = require("axios");
const { decode } = require("js-base64");
const { extractCompanyAndPositions } = require("./extractedCompanyAndPosition");
const {
  productionClassifierForIsJobApplication,
} = require("../natural-language-processing/stableClassifiers");

async function getGmailEmails(accessToken) {
  try {
    const baseUrl = "https://www.googleapis.com/gmail/v1/users/me/messages";
    // const queryParams = "?q=after:2023/05/13&maxResults=20&labelIds=INBOX"; // Adjust maxResults to fetch the desired number of emails
    const queryParams = "?maxResults=10&labelIds=INBOX"; // Adjust maxResults to fetch the desired number of emails
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    };

    // Fetch message list from the Gmail API
    const messageListResponse = await axios.get(`${baseUrl}${queryParams}`, {
      headers,
    });
    const messageIds = messageListResponse?.data?.messages?.map(
      (message) => message.id
    );

    //  Fetch email details for each message ID
    const emails = [];
    for (const messageId of messageIds) {
      const messageResponse = await axios.get(`${baseUrl}/${messageId}`, {
        headers,
      });

      const bodyData = messageResponse?.data?.payload?.parts?.[0]?.body?.data;

      if (bodyData !== null && bodyData !== undefined) {
        const decodedBody = decode(bodyData);
        const isJobApplication = await productionClassifierForIsJobApplication(
          decodedBody
        );
        if (isJobApplication) {
          const truncatedMessage = decodedBody.slice(0, 220);
          const extractedCompanyAndPosition = await extractCompanyAndPositions(
            truncatedMessage
          );
          const filteredExtractedCompanyAndPosition = (
            extractedCompanyAndPosition
          ) => {
            const { companyName, position } = extractedCompanyAndPosition;
            if (companyName !== "" && position !== "") {
              return extractedCompanyAndPosition;
            }
          };

          const internalDate = new Date(
            parseInt(messageResponse.data.internalDate, 10)
          );
          const appliedAt = internalDate.toISOString();
          const email = {
            appliedAt: appliedAt,
            externalId: messageResponse.data.id,
            // ...(extractedCompanyAndPosition || {
            //   companyName: "",
            //   position: "",
            // }),
            ...filteredExtractedCompanyAndPosition(extractCompanyAndPositions),
          };
          emails.push(email);
        }
      }
    }

    return emails;
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw new Error("Error fetching emails");
  }
}

module.exports = { getGmailEmails };
