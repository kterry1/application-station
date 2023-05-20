const testIsJobApplicationEmail = [
  // 20 examples (all with label: true)
  {
    text: "Congratulations! We are excited to extend a job offer to you for the position you applied for at our company.",
    label: true,
  },
  {
    text: "After reviewing your application, we are pleased to invite you for an onsite interview to further discuss your qualifications.",
    label: true,
  },
  {
    text: "Thank you for your recent application. We have decided to proceed with other candidates whose skills and experience better align with the requirements of the position.",
    label: true,
  },
  {
    text: "We have received your job application and are in the process of reviewing your qualifications. We will contact you if we require any additional information or if we would like to schedule an interview.",
    label: true,
  },
  {
    text: "We appreciate your interest in our company and the time you took to apply for the position. We have decided to move forward with other candidates who more closely fit our needs.",
    label: true,
  },
  {
    text: "Thank you for applying to our recent job posting. We are happy to inform you that we would like to invite you for a phone interview to discuss your application further.",
    label: true,
  },
  {
    text: "Your application for the position has been reviewed, and we are pleased to extend an offer for an in-person interview with our hiring team.",
    label: true,
  },
  {
    text: "We have completed our review of your job application, and unfortunately, we will not be moving forward with you for this position. We wish you the best in your job search.",
    label: true,
  },
  {
    text: "Thank you for submitting your application. We have carefully reviewed your qualifications and are excited to invite you to the next stage of our recruitment process.",
    label: true,
  },
  {
    text: "Your job application has been received, and we are currently in the process of evaluating all candidates. We will reach out to you shortly with the next steps in our hiring process.",
    label: true,
  },
  {
    text: "We are pleased to inform you that you have been selected for a second-round interview with our company. We look forward to discussing your qualifications in more detail.",
    label: true,
  },
  {
    text: "After reviewing your application, we have decided to move forward with other candidates for the position. We appreciate your interest in our company and wish you the best in your job search.",
    label: true,
  },
  {
    text: "Thank you for applying to our open position. We have reviewed your qualifications and would like to invite you to participate in a video interview with our hiring team.",
    label: true,
  },
  {
    text: "Thank you for applying to our open position. We have reviewed your qualifications and would like to invite you to participate in a video interview with our hiring team.",
    label: true,
  },
  {
    text: "Thank you for applying to our open position. We have reviewed your qualifications and would like to invite you to participate in a video interview with our hiring team.",
    label: true,
  },
  {
    text: "Thank you for applying to our open position. We have reviewed your qualifications and would like to invite you to participate in a video interview with our hiring team.",
    label: true,
  },
  {
    text: "We have carefully reviewed your application and are excited to inform you that we would like to offer you a position with our company.",
    label: true,
  },
  {
    text: "Thank you for your recent application. We have decided to pursue other candidates whose qualifications more closely align with the requirements of the position.",
    label: true,
  },
  {
    text: "We have received your job application and are currently reviewing your qualifications. We will be in touch with you shortly to discuss the next steps in our hiring process.",
    label: true,
  },
];

const testIsNotJobApplicationEmail = [
  // 20 new examples (all with label: false)
  {
    text: "Just a reminder that our team meeting is scheduled for tomorrow at 10:00 AM. Please prepare your updates in advance.",
    label: false,
  },
  {
    text: "Don't forget to submit your timesheets by the end of the day today. Let me know if you have any issues.",
    label: false,
  },
  {
    text: "Hey! I wanted to share this interesting article I found on recent trends in web development. Check it out when you have some time.",
    label: false,
  },
  {
    text: "Your order has been shipped! You can track your package using the tracking number provided.",
    label: false,
  },
  {
    text: "Please review the attached project proposal and provide your feedback by the end of the week.",
    label: false,
  },
  {
    text: "The monthly newsletter is out! Click the link to read the latest updates and upcoming events.",
    label: false,
  },
  {
    text: "There will be a scheduled system maintenance this weekend. Please save your work and log off before the maintenance begins.",
    label: false,
  },
  {
    text: "Our records show that your subscription is about to expire. Click here to renew your subscription and continue enjoying our services.",
    label: false,
  },
  {
    text: "We are excited to announce our upcoming webinar on the future of AI. Register now to secure your spot!",
    label: false,
  },
  {
    text: "Join us for the annual company retreat next month. Please RSVP and select your preferred activities by next week.",
    label: false,
  },
  {
    text: "The new software update is now available for download. Please update your system at your earliest convenience.",
    label: false,
  },
  {
    text: "Your recent transaction has been processed successfully. Please find the transaction details attached.",
    label: false,
  },
  {
    text: "Our new product line is now available! Visit our online store to explore our latest offerings and take advantage of exclusive discounts.",
    label: false,
  },
  {
    text: "We are experiencing a temporary outage of our customer support service. We apologize for the inconvenience and are working to resolve the issue as quickly as possible.",
    label: false,
  },
  {
    text: "Thank you for your recent purchase! We hope you enjoy your new product. If you have any questions or concerns, please do not hesitate to contact our support team.",
    label: false,
  },
];

module.exports = {
  testStringsRejected,
  testStringsNextRound,
  testStringsAwaitingResponse,
  testStringsReceivedOffer,
  testIsJobApplicationEmail,
  testIsNotJobApplicationEmail,
};
