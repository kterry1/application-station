const { Classifier } = require("classifier.js");
// const { trainingData } = require("./training-data");
const { testClassifier } = require("./test-data");
const classifier = new Classifier({ percentualReturn: true });

trainingData.map((application) => {
  classifier.learn(application.text, [application.label]);
});

// ** Uncomment out lines below and create a **
// ** new stable classifier file before saving **
// classifier.toJSON("stable-classifier_5_1_2023.json");
// const classified = await classifier.fromJSON("stable-classifier_5_1_2023.json");
testClassifier(classifier);
