const { Classifier } = require("classifier.js");
const path = require("path");
const stringToBoolean = (str) =>
  str.toLowerCase() === "false" ? false : Boolean(str);

const getHighestPercentageKeyForEmailDecision = (percentageObj) => {
  // EX: {unknown, rejected, awaitingResponse, receivedOffer, nextRound}
  let highestPercentage = 0;
  let highestPercentageKey = null;

  for (const [key, value] of Object.entries(percentageObj)) {
    const percentage = parseInt(value.replace("%", ""));
    if (percentage > highestPercentage) {
      highestPercentage = percentage;
      highestPercentageKey = key;
    }
  }

  return highestPercentageKey;
};

const isJobApplicationEmailCheck = (percentageObj) => {
  // EX: {(true + unknown) vs false}
  let highestPercentage = 0;
  let highestPercentageKey = null;

  for (const [key, value] of Object.entries(percentageObj)) {
    const percentage = parseInt(value.replace("%", ""));

    if (key === "unknown" || key === "true") {
      highestPercentage += percentage;
    } else {
      if (percentage > highestPercentage) {
        highestPercentage = percentage;
        highestPercentageKey = key;
      }
    }
  }

  if (highestPercentageKey === null) {
    return "true";
  } else {
    return highestPercentageKey;
  }
};

const productionClassifierForIsJobApplication = async (decodedMessageBody) => {
  const classifier = new Classifier({ percentualReturn: true });
  const filePath = path.join(
    __dirname,
    "is-job-application-email-stable-classifier_5_4_2023.json"
  );
  await classifier.fromJSON(filePath);
  const classifiedObj = classifier.classify(decodedMessageBody);
  return stringToBoolean(isJobApplicationEmailCheck(classifiedObj));
};

module.exports = {
  productionClassifierForIsJobApplication,
  getHighestPercentageKeyForEmailDecision,
  isJobApplicationEmailCheck,
  stringToBoolean,
};
