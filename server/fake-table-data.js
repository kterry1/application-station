const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "aliceJ55@gmail.com",
    isAuthenticated: true,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob_smith_farmer@gmail.com",
    isAuthenticated: true,
  },
  {
    id: 3,
    name: "Carol Williams",
    email: "carol1234Williams@gmail.com",
    isAuthenticated: false,
  },
];

const companyApplications = [
  {
    id: 1,
    companyName: "Acme Corp",
    position: "Software Engineer",
    awaitingResponse: true,
    rejected: false,
    nextRound: false,
    receivedOffer: false,
    acceptedOffer: false,
    notes: "Great interview process",
    appliedAt: new Date("2023-04-01T10:00:00Z"),
    createdAt: new Date("2023-04-01T11:00:00Z"),
    updatedAt: new Date("2023-04-01T11:00:00Z"),
    userId: 1,
  },
  {
    id: 2,
    companyName: "Tech Solutions",
    position: "Data Analyst",
    awaitingResponse: false,
    rejected: true,
    nextRound: false,
    receivedOffer: false,
    acceptedOffer: false,
    notes: "Not a good fit",
    appliedAt: new Date("2023-04-05T12:00:00Z"),
    createdAt: new Date("2023-04-05T13:00:00Z"),
    updatedAt: new Date("2023-04-05T13:00:00Z"),
    userId: 1,
  },
  {
    id: 3,
    companyName: "Global Industries",
    position: "Software Engineer",
    awaitingResponse: false,
    rejected: false,
    nextRound: true,
    receivedOffer: false,
    acceptedOffer: false,
    notes: "Excited for next round",
    appliedAt: new Date("2023-04-10T14:00:00Z"),
    createdAt: new Date("2023-04-10T15:00:00Z"),
    updatedAt: new Date("2023-04-10T15:00:00Z"),
    userId: 2,
  },
];

const db = { users, companyApplications };

module.exports = { db };
