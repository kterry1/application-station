const testStringsRejected = [
  "Thank you for your interest in the Software Engineer role at our company. After reviewing your application, we have decided not to move forward with your candidacy at this time. We appreciate your time and interest in our company.",
  "Unfortunately, we have decided not to move forward with your application for the Marketing Manager position. We had many strong candidates apply, and we have decided to pursue other candidates whose skills and experience more closely align with our requirements. Thank you for your interest in our company and good luck with your job search.",
  "Thank you for your interest in the Data Analyst role at our company. After careful consideration, we have decided not to move forward with your application at this time. We appreciate your time and interest in our company.",
];

const testStringsNextRound = [
  "Congratulations! We would like to invite you to the next round of interviews for the Software Engineer position at our company. Please let us know your availability to schedule an interview.",
  "Thank you for your interest in the Marketing Manager position at our company. We were impressed with your application and would like to invite you to the next round of interviews. Please let us know your availability to schedule an interview.",
  "We are pleased to inform you that you have been selected to move on to the next round of interviews for the Data Analyst role at our company. We will be in touch shortly to schedule your interview.",
];

const testStringsAwaitingResponse = [
  "Thank you for applying to the Sales Associate position at our company. We have received your application and are currently reviewing it. We will be in touch soon regarding the status of your application.",
  "Thank you for your interest in the Content Writer role at our company. We have received your application and are currently reviewing it. We will be in touch soon regarding the status of your application.",
  "Thank you for your interest in the Customer Service Representative position at our company. We have received your application and are currently reviewing it. We will be in touch soon regarding the status of your application.",
];

const testStringsReceivedOffer = [
  "We are thrilled to offer you the Software Engineer position at our company! We believe you will be a great addition to our team and are excited for you to start. Please let us know if you have any questions or concerns.",
  "Congratulations on being selected for the Marketing Manager role at our company! We were impressed with your skills and experience, and believe you will excel in this position. Please let us know if you have any questions or concerns.",
  "We are pleased to offer you the Data Analyst position at our company! We believe you will be a valuable asset to our team and are excited to have you on board. Please let us know if you have any questions or concerns.",
];

const testClassifier = (classifier) => {
  testStringsRejected.map((string) => {
    console.log("Rejected", classifier.classify(string));
  });
  testStringsNextRound.map((string) => {
    console.log("Next Round", classifier.classify(string));
  });
  testStringsAwaitingResponse.map((string) => {
    console.log("Awaiting Response", classifier.classify(string));
  });
  testStringsReceivedOffer.map((string) => {
    console.log("Received Offer", classifier.classify(string));
  });
};

module.exports = {
  testClassifier,
};
