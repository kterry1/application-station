const { Classifier } = require("classifier.js");
const { testClassifier } = require("./test-data");
const classifier = new Classifier({ percentualReturn: true });

const runClassifier = async () => {
  await classifier.fromJSON("stable-classifier_5_1_2023.json");

  // Add test file for this function
  // Manually confirm the percentages check out
  // Adjust training data and re-run trainData.js file if needed
  testClassifier(classifier);
};
runClassifier();
