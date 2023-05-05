require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KPI,
});
const openai = new OpenAIApi(configuration);

const extractCompanyAndPositions = async (text) => {
  const prompt = `Extract the company name and the position(job title) from the following text into a js object without a variable name: \n"${text}"\n`;
  const extractedData = await openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 200,
    })
    .then((response) => {
      const correctedString = response.data.choices[0].text.replace(
        /([a-zA-Z0-9]+?):/g,
        '"$1":'
      );
      return JSON.parse(correctedString);
    })
    .catch((error) => {
      console.error(error);
    });
  return extractedData;
};
module.exports = { extractCompanyAndPositions };
