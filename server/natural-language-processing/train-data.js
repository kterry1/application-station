const { Classifier } = require("classifier.js");
const path = require("path");
const fs = require("fs");
const {
  isJobAllcationEmailTrainingData,
} = require("./is-job-application-email-training-data");
const {
  testIsJobApplicationEmail,
  testIsNotJobApplicationEmail,
} = require("./test-data");
const { getHighestPercentageKey } = require("./stableClassifier");

const testJsonClassifierFileName = "test-is-jon-application-email.json";

const trainClassifier = () => {
  const classifier = new Classifier({ percentualReturn: true });

  isJobAllcationEmailTrainingData.map((application) => {
    classifier.learn(application.text, [application.label]);
  });
  const filePath = path.join(__dirname, testJsonClassifierFileName);
  fs.unlink(filePath, async (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        classifier.toJSON(testJsonClassifierFileName);
      }
      console.error("Error deleting the file:", err);
      return;
    } else {
      console.log("File deleted successfully");
      // Save the trained classifier to a JSON file
      setTimeout(() => {
        classifier.toJSON(testJsonClassifierFileName);
      }, "1000");
    }
  });
};

const testClassifier = async () => {
  const loadedClassifier = new Classifier({ percentualReturn: true });
  // Load the classifier from a JSON file
  const filePath = path.join(__dirname, testJsonClassifierFileName);

  await loadedClassifier.fromJSON(filePath);
  testIsJobApplicationEmail.map((emailObject) => {
    console.log(
      "TRUE",
      getHighestPercentageKey(loadedClassifier.classify(emailObject.text))
    );
  });
  testIsNotJobApplicationEmail.map((emailObject) => {
    console.log(
      "FALSE",
      getHighestPercentageKey(loadedClassifier.classify(emailObject.text))
    );
  });

  // testStringsRejected.map((string) => {
  //   console.log("Rejected", classifier.classify(string));
  // });
  // testStringsNextRound.map((string) => {
  //   console.log("Next Round", classifier.classify(string));
  // });
  // testStringsAwaitingResponse.map((string) => {
  //   console.log("Awaiting Response", classifier.classify(string));
  // });
  // testStringsReceivedOffer.map((string) => {
  //   console.log("Received Offer", classifier.classify(string));
  // });
};

// trainClassifier();
testClassifier();
