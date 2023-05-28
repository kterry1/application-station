const axios = require("axios");
const { decode } = require("js-base64");
const { getClassifiedFields } = require("./getClassifiedFields");
const {
  productionClassifierForIsJobApplication,
} = require("../natural-language-processing/stableClassifiers");
const { replaceNullWithFalseInObj, normalizeCompanyName } = require("../utils");
const Bottleneck = require("bottleneck");

const limiter = new Bottleneck({
  maxConcurrent: 45,
  minTime: 200,
});

const maxResults = 15;

async function getEmails(accessToken) {
  try {
    const baseUrl = "https://www.googleapis.com/gmail/v1/users/me/messages";
    // const queryParams = "?q=after:2023/05/13&maxResults=20&labelIds=INBOX"; // Adjust maxResults to fetch the desired number of emails
    const queryParams = `?maxResults=${maxResults}&labelIds=INBOX`; // Adjust maxResults to fetch the desired number of emails
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
    await Promise.all(
      messageIds?.map(async (messageId) => {
        const messageResponse = await limiter.schedule(() =>
          axios
            .get(`${baseUrl}/${messageId}`, {
              headers,
            })
            .catch((error) => {
              console.error(
                `Error fetching message with id: ${messageId}. Message: ${error.message}`
              );
              return null;
            })
        );

        const bodyData = messageResponse?.data?.payload?.parts?.[0]?.body?.data;

        if (bodyData !== null && bodyData !== undefined) {
          const subjectObject = messageResponse?.data?.payload.headers.find(
            (header) => header.name === "Subject"
          );
          const decodedBody = subjectObject.value + decode(bodyData);

          const isJobApplication =
            await productionClassifierForIsJobApplication(decodedBody);
          if (isJobApplication) {
            const truncatedMessage = decodedBody.slice(0, 300);

            const extractedCompanyAndPosition = await getClassifiedFields(
              truncatedMessage,
              messageId
            );
            const filteredExtractedCompanyAndPosition = (
              extractedCompanyAndPosition
            ) => {
              if (
                extractedCompanyAndPosition &&
                extractedCompanyAndPosition?.companyName !== "" &&
                Object.keys(extractedCompanyAndPosition)?.length > 0
              ) {
                const internalDate = new Date(
                  parseInt(messageResponse.data.internalDate, 10)
                );
                const appliedAt = internalDate.toISOString();
                const transformedFields = replaceNullWithFalseInObj(
                  extractedCompanyAndPosition
                );
                return {
                  appliedAt: appliedAt,
                  externalId: messageResponse.data.id,
                  ...transformedFields,
                  companyName: normalizeCompanyName(
                    transformedFields.companyName
                  ),
                };
              }
            };
            if (
              filteredExtractedCompanyAndPosition(
                extractedCompanyAndPosition
              ) !== undefined
            ) {
              emails.push(
                filteredExtractedCompanyAndPosition(extractedCompanyAndPosition)
              );
            }
          }
        }
      })
    );
    return emails;
  } catch (error) {
    console.error(`Error fetching emails: ${error.message}`);
  }
}

module.exports = { getEmails };
