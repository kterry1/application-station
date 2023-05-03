const { Classifier } = require("classifier.js");
const { trainingData } = require("./training-data");
const { testClassifier } = require("./test-data");
const classifier = new Classifier({ percentualReturn: true });

const getHighestPercentageKey = (percentageObj) => {
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

const testingClassifier = async () => {
  await classifier.fromJSON("stable-classifier_5_1_2023.json");
  // Add test file for this function
  // Manually confirm the percentages check out
  // Adjust training data and re-run trainData.js file if needed
  testClassifier(classifier);
};

const productionClassifier = async (decodedMessageBody) => {
  await classifier.fromJSON("stable-classifier_5_1_2023.json");
  const classifiedObj = classifier.classify(decodedMessageBody);
  return getHighestPercentageKey(classifiedObj);
};

module.exports = { productionClassifier };
