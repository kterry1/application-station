require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KPI,
});
const openai = new OpenAIApi(configuration);
const isValidJson = (jsonString) => {
  try {
    const jsonObj = JSON.parse(jsonString);
    return (
      "companyName" in jsonObj &&
      "position" in jsonObj &&
      jsonObj["companyName"] !== null &&
      jsonObj["position"] !== null
    );
  } catch (error) {
    return false;
  }
};

// const extractCompanyAndPositions = async (text) => {
//   await extractDataFromMessages(text);
//   const prompt = `Extract the company name and position from this email and return a JSON object with the keys 'companyName' and 'position': \n"${text}"\n`;
//   const extractedMessageData = await openai
//     .createCompletion({
//       model: "text-davinci-003",
//       prompt: prompt,
//       temperature: 0,
//       max_tokens: 200,
//     })
//     .then((response) => {
//       const extractedData = response?.data?.choices[0].text;
//       if (extractedData && isValidJson(extractedData)) {
//         return JSON.parse(extractedData);
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   return extractedMessageData;
// };

const extractCompanyAndPositions = async (text) => {
  const prompt = `Extract the company name and position from the quoted text. Determine if it's a job application and indicate the status as one of the following: rejected, moving to the next round, awaiting a response, received an offer, or unable to classify (if unable to determine true for rejected, nextRound, receivedOffer, or awaitingResponse). Organize the information in a JSON object with the following keys: "companyName", "position", "rejected", "nextRound", "receivedOffer", "awaitingResponse", and "unableToClassify": \n"${text}"\n\nThe response should only include the JSON object. companyName and position are strings, the rest are booleans.`;
  const extractedData = await openai
    .createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    })
    .then((response) => {
      const content = response.data.choices[0].message.content;
      if (content && isValidJson(content)) {
        console.log(JSON.parse(content));
        return JSON.parse(content);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return extractedData;
};

module.exports = { extractCompanyAndPositions };
