const demoEmails = [
  {
    appliedAt: "2023-05-01T17:00:00.000Z",
    externalId: "1a7859cbfe40149c",
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
    externalId: "2b796adeff20148d",
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
    externalId: "3c707be1ff30147e",
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
    externalId: "4d718be2ff40146f",
    companyName: "Spotify",
    position: "Data Scientist",
    rejected: false,
    nextRound: false,
    receivedOffer: false,
    awaitingResponse: false,
    unableToClassify: true,
  },
  {
    appliedAt: "2023-05-30T13:45:00.000Z",
    externalId: "5e729be3ff50145e",
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
    externalId: "6f73abe4ff60144d",
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
    externalId: "7g74bbe5ff70143c",
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
    externalId: "8h75cbe6ff80142b",
    companyName: "IBM",
    position: "Software Tester",
    rejected: true,
    nextRound: false,
    receivedOffer: false,
    awaitingResponse: false,
    unableToClassify: true,
  },
  {
    appliedAt: "2023-06-04T09:00:00.000Z",
    externalId: "9i76dbe7ff90121a",
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
    externalId: "10j77ebe8fa01209",
    companyName: "Uber",
    position: "Data Analyst",
    rejected: false,
    nextRound: true,
    receivedOffer: false,
    awaitingResponse: false,
    unableToClassify: true,
  },
  {
    appliedAt: "2023-06-06T13:00:00.000Z",
    externalId: "11k78fbe9fb012f8",
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
    externalId: "12l79gbeafc012e7",
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
    externalId: "13m80hbebfd012d6",
    companyName: "Zoom",
    position: "Network Engineer",
    rejected: false,
    nextRound: true,
    receivedOffer: false,
    awaitingResponse: false,
    unableToClassify: false,
  },
];

let currentIndex = 0;

const getDemoEmails = () => {
  const emails = demoEmails.slice(currentIndex, currentIndex + 3);
  currentIndex += 3;
  return emails;
};

module.exports = { getDemoEmails };
