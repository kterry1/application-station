require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const Bottleneck = require("bottleneck");

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 2000,
});

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KPI,
});
const openai = new OpenAIApi(configuration);
const isValidJson = (jsonString) => {
  try {
    const extractedJson = jsonString.match(/{.*}/s)[0];
    const jsonObj = JSON.parse(extractedJson);
    return (
      "companyName" in jsonObj &&
      "position" in jsonObj &&
      jsonObj["companyName"] !== null &&
      jsonObj["position"] !== null
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};

const extractCompanyAndPositions = async (text) => {
  const prompt = `Extract the company name and position from the quoted text. Determine if it's a job application and indicate the status as one of the following: rejected, moving to the next round, awaiting a response, received an offer, or unable to classify (if unable to determine true for rejected, nextRound, receivedOffer, or awaitingResponse). Organize the information in a JSON object with the following keys: "companyName", "position", "rejected", "nextRound", "receivedOffer", "awaitingResponse", and "unableToClassify": \n"${text}"\n\nThe response should only include the JSON object. companyName and position are strings, the rest are booleans.`;
  try {
    const extractedData = await limiter.schedule(() =>
      openai
        .createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        })
        .then((response) => {
          const content = response.data.choices[0].message.content;
          if (content && isValidJson(content)) {
            try {
              console.log(content);
              return JSON.parse(content);
            } catch (error) {
              console.error(error);
              throw new Error("Failed to parse valid json");
            }
          }
        })
        .catch((error) => {
          console.error(error);
        })
    );
    return extractedData;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { extractCompanyAndPositions };
