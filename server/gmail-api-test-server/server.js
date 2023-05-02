const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3001;
const { decode } = require("js-base64");
const fs = require("fs");
const { extractCompanyAndPositions } = require("./extractCompanyAndPositions");
const { productionClassifier } = require("./stableClassifier");

app.use(cors());
app.use(express.json());

async function getEmails(accessToken) {
  try {
    const baseUrl = "https://www.googleapis.com/gmail/v1/users/me/messages";
    const queryParams = "?maxResults=10&labelIds=INBOX"; // Adjust maxResults to fetch the desired number of emails
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
        const truncatedMessage = decodedBody.slice(0, 220);
        const extractedCompanyAndPosition = await extractCompanyAndPositions(
          truncatedMessage
        );
        console.log(extractedCompanyAndPosition);
        const extractReasonForMessage = await productionClassifier(
          truncatedMessage
        );
        const transformExtractedReasonForMessage = (
          extractReasonForMessage
        ) => {
          if (extractReasonForMessage !== "unknown") {
            return {
              awaitingResponse: false,
              rejected: false,
              recievedOffer: false,
              acceptedOffer: false,
              [extractReasonForMessage]: true,
            };
          } else {
            return {
              awaitingResponse: false,
              rejected: false,
              recievedOffer: false,
              acceptedOffer: false,
            };
          }
        };
        const email = {
          id: messageResponse.data.id,
          // snippet: truncatedMessage,
          ...transformExtractedReasonForMessage(extractReasonForMessage),
          ...extractedCompanyAndPosition,
          // Add date of email
        };
        emails.push(email);
      }
    }

    return emails;
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw error;
  }
}

app.post("/fetch-emails", async (req, res) => {
  try {
    const accessToken = req.body.accessToken;
    const emails = await getEmails(accessToken);

    res.json(emails);
    console.log(emails);
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).send("Error fetching emails");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
