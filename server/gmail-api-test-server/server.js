const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3001;
const { decode } = require("js-base64");
const fs = require("fs");

app.use(cors());
app.use(express.json()); // Enable JSON body parsing

async function getEmails(accessToken) {
  try {
    const baseUrl = "https://www.googleapis.com/gmail/v1/users/me/messages";
    const queryParams = "?maxResults=40&labelIds=INBOX"; // Adjust maxResults to fetch the desired number of emails
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
    let messages = [];
    for (const messageId of messageIds) {
      const messageResponse = await axios.get(`${baseUrl}/${messageId}`, {
        headers,
      });
      // const bodyData = () => {
      //   if (messageResponse?.data?.payload?.parts?.[0]?.body?.data) {
      //     return messageResponse.data.payload.parts[0].body.data;
      //   } else {
      //     return null;
      //   }
      // };
      const bodyData = messageResponse?.data?.payload?.parts?.[0]?.body?.data;
      // const decodedBody = bodyData.length > 0 && decode(bodyData.toString());
      if (bodyData !== null && bodyData !== undefined) {
        const decodedBody = decode(bodyData);
        // Add the new message to the array
        const newMessage = { text: decodedBody, label: "" };
        messages.push(newMessage);
        // Write the updated messages back to the file
        fs.writeFileSync("message.js", JSON.stringify(messages));
        console.log(decodedBody);
      } else {
        console.log("Message body is not available");
      }
      // const decodedBody = Buffer.from(bodyData, "base64").toString("utf-8");
      // console.log("decoded", decodedBody);
      // const body = messageResponse.data.payload.parts.find(
      //   (part) => part.mimeType === "text/html"
      // ).body.data;
      // const decodedBody = Buffer.from(body, "base64").toString();
      // const $ = cheerio.load(decodedBody);
      // email.body = $("body").text();
      // console.log(bodyData);
      const email = {
        // ...messageResponse.data,
        id: messageResponse.data.id,
        snippet: messageResponse.data.snippet,
        subject: messageResponse.data.payload.headers.find(
          (h) => h.name === "Subject"
        ).value,
        // body: decodedBody,
        // Extract additional data (such as 'From', 'To', 'Subject') from the message payload here if needed
      };
      emails.push(email);
    }

    return emails;
    // return messageListResponse.data.messages;
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw error;
  }
}

app.post("/fetch-emails", async (req, res) => {
  try {
    const accessToken = req.body.accessToken;
    const emails = await getEmails(accessToken);

    // console.log(emails);
    res.json(emails);
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).send("Error fetching emails");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
