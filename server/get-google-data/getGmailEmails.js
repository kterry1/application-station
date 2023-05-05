const axios = require("axios");
const { decode } = require("js-base64");
const fs = require("fs");
const { extractCompanyAndPositions } = require("./extractedCompanyAndPosition");
const {
  productionClassifierForIsJobApplication,
  productionClassifierForEmailDecision,
} = require("../natural-language-processing/stableClassifiers");

async function getGmailEmails(accessToken) {
  try {
    const baseUrl = "https://www.googleapis.com/gmail/v1/users/me/messages";
    const queryParams = "?maxResults=5&labelIds=INBOX"; // Adjust maxResults to fetch the desired number of emails
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    };

    // Fetch message list from the Gmail API
    const messageListResponse = await axios.get(`${baseUrl}${queryParams}`, {
      headers,
    });
    const messageIds = messageListResponse.data.messages.map(
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
          console.log(extractedCompanyAndPosition);
          const extractClassificationForMessage =
            await productionClassifierForEmailDecision(
              // truncatedMessage
              decodedBody
            );
          const internalDate = new Date(
            parseInt(messageResponse.data.internalDate, 10)
          );
          const appliedAt = internalDate.toISOString();
          const extractClassificationForMessageTransformer =
            extractClassificationForMessage === "unknown"
              ? "unableToClassify"
              : extractClassificationForMessage;
          const transformExtractedClassificationForMessage = (
            extractClassificationForMessage
          ) => {
            return {
              appliedAt: appliedAt,
              [extractClassificationForMessage]: true,
            };
          };
          const email = {
            externalId: messageResponse.data.id,
            ...transformExtractedClassificationForMessage(
              extractClassificationForMessageTransformer
            ),
            ...extractedCompanyAndPosition,
          };
          emails.push(email);
        }
      }
    }

    return emails;
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw error;
  }
}

module.exports = { getGmailEmails };
