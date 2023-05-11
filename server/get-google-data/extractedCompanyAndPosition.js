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

const extractCompanyAndPositions = async (text) => {
  // const prompt = `Extract the company name and the position from the following text into a js object without a variable name: \n"${text}"\n`;
  const prompt = `Extract the company name and position from this email and return a JSON object with the keys 'companyName' and 'position': \n"${text}"\n`;
  const extractedData = await openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 200,
    })
    .then((response) => {
      const extractedData = response?.data?.choices[0].text;
      if (extractedData && isValidJson(extractedData)) {
        return JSON.parse(extractedData);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return extractedData;
};
module.exports = { extractCompanyAndPositions };
