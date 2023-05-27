const { generateRandomString } = require("../utils");

const demoEmails = (demoAccountRandomString) => [
  {
    appliedAt: "2023-05-01T17:00:00.000Z",
    externalId: `${generateRandomString(11)}${demoAccountRandomString}`,
    companyName: "Amazon",
    position: "Backend Developer",
    rejected: false,
    nextRound: true,
    receivedOffer: false,
    awaitingResponse: true,
    unableToClassify: false,
  },
  {
    appliedAt: "2023-05-27T10:30:00.000Z",
    externalId: `${generateRandomString(11)}${demoAccountRandomString}`,
    companyName: "Microsoft",
    position: "Full Stack Developer",
    rejected: true,
    nextRound: false,
    receivedOffer: false,
    awaitingResponse: false,
    unableToClassify: false,
  },
  {
    appliedAt: "2023-05-28T11:15:00.000Z",
    externalId: `${generateRandomString(11)}${demoAccountRandomString}`,
    companyName: "Netflix",
    position: "Frontend Developer",
    rejected: false,
    nextRound: true,
    receivedOffer: false,
    awaitingResponse: false,
    unableToClassify: false,
  },
  {
    appliedAt: "2023-05-29T12:00:00.000Z",
    externalId: `${generateRandomString(11)}${demoAccountRandomString}`,
    companyName: "Spotify",
    position: "Data Scientist",
    rejected: false,
    nextRound: false,
    receivedOffer: false,
    awaitingResponse: true,
    unableToClassify: false,
  },
  {
    appliedAt: "2023-05-30T13:45:00.000Z",
    externalId: `${generateRandomString(11)}${demoAccountRandomString}`,
    companyName: "Twitter",
    position: "ML/AI Engineer",
    rejected: false,
    nextRound: true,
    receivedOffer: false,
    awaitingResponse: false,
    unableToClassify: false,
  },
  {
    appliedAt: "2023-05-31T14:30:00.000Z",
    externalId: `${generateRandomString(11)}${demoAccountRandomString}`,
    companyName: "Facebook",
    position: "iOS Developer",
    rejected: false,
    nextRound: false,
    receivedOffer: true,
    awaitingResponse: false,
    unableToClassify: false,
  },
  {
    appliedAt: "2023-06-01T15:15:00.000Z",
    externalId: `${generateRandomString(11)}${demoAccountRandomString}`,
    companyName: "Google",
    position: "Android Developer",
    rejected: false,
    nextRound: false,
    receivedOffer: false,
    awaitingResponse: true,
    unableToClassify: false,
  },
  {
    appliedAt: "2023-06-02T16:00:00.000Z",
    externalId: `${generateRandomString(11)}${demoAccountRandomString}`,
    companyName: "IBM",
    position: "Software Tester",
    rejected: false,
    nextRound: false,
    receivedOffer: true,
    awaitingResponse: false,
    unableToClassify: false,
  },
  {
    appliedAt: "2023-06-04T09:00:00.000Z",
    externalId: `${generateRandomString(11)}${demoAccountRandomString}`,
    companyName: "Airbnb",
    position: "Product Manager",
    rejected: true,
    nextRound: false,
    receivedOffer: false,
    awaitingResponse: false,
    unableToClassify: false,
  },
  {
    appliedAt: "2023-06-05T11:30:00.000Z",
    externalId: `${generateRandomString(11)}${demoAccountRandomString}`,
    companyName: "Uber",
    position: "Data Analyst",
    rejected: false,
    nextRound: false,
    receivedOffer: false,
    awaitingResponse: false,
    unableToClassify: true,
  },
  {
    appliedAt: "2023-06-06T13:00:00.000Z",
    externalId: `${generateRandomString(11)}${demoAccountRandomString}`,
    companyName: "Lyft",
    position: "UI/UX Designer",
    rejected: false,
    nextRound: false,
    receivedOffer: false,
    awaitingResponse: true,
    unableToClassify: false,
  },
  {
    appliedAt: "2023-06-07T15:30:00.000Z",
    externalId: `${generateRandomString(11)}${demoAccountRandomString}`,
    companyName: "Slack",
    position: "Security Engineer",
    rejected: false,
    nextRound: false,
    receivedOffer: true,
    awaitingResponse: false,
    unableToClassify: false,
  },
  {
    appliedAt: "2023-06-08T17:00:00.000Z",
    externalId: `${generateRandomString(11)}${demoAccountRandomString}`,
    companyName: "Zoom",
    position: "Network Engineer",
    rejected: false,
    nextRound: true,
    receivedOffer: false,
    awaitingResponse: false,
    unableToClassify: false,
  },
];

let indexObject = { currentIndex: 0, lastDemoAccount: "" };

const getDemoEmails = (demoAccountRandomString) => {
  if (demoAccountRandomString !== indexObject.lastDemoAccount) {
    indexObject.currentIndex = 0;
  }

  const emails = demoEmails(demoAccountRandomString).slice(
    indexObject.currentIndex,
    indexObject.currentIndex + 3
  );

  indexObject.currentIndex += 3;
  indexObject.lastDemoAccount = demoAccountRandomString;

  return emails;
};

module.exports = { getDemoEmails };
