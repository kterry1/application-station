export const steps = [
  {
    target: ".first-step-tour",
    content: (
      <>
        <h2>
          <b>Welcome to Application Station</b>
        </h2>
        <p>
          <em>The company application email response tracker.</em>
        </p>
        <br />
        <p>Please click 'Next' to learn more.</p>
      </>
    ),
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    spotlightClicks: true,
    styles: {
      options: {
        zIndex: 10000,
      },
    },
  },
  {
    target: ".second-step-tour",
    content: (
      <>
        <h2>
          <b>Demo Account</b>
        </h2>
        <p>Let's start by logging in.</p>
      </>
    ),
    hideCloseButton: true,
    hideFooter: true,
    spotlightClicks: true,
    stepInteraction: true,
    disableBeacon: true,
    disableOverlayClose: true,
    styles: {
      options: {
        zIndex: 10000,
      },
    },
  },
  {
    target: ".third-step-tour",
    content: (
      <>
        <h2>
          <b>Company Applications Tracker</b>
        </h2>
        <p>
          The <em>Company Applications Tracker</em> allows you to import emails
          you receive when applying to job postings.
        </p>
        <br />
        <p>
          During the import process, emails will be collected, checked that they
          are job application related emails by running them through a native
          NLP model, classified using OpenAI's API and any relevant data will be
          pulled out.
        </p>
      </>
    ),
    hideCloseButton: true,
    disableBeacon: true,
    disableOverlayClose: true,
    hideBackButton: true,
    styles: {
      options: {
        zIndex: 10000,
      },
    },
  },
  {
    target: ".fourth-step-tour",
    content: (
      <>
        <h2>
          <b>Import Emails</b>
        </h2>
        <p>
          Click the <em>Import Emails</em> button to begin the import process.
        </p>
        <br />
        <p>
          Once imported, you are free to click into the records, edit/delete
          them, and more.
        </p>
        <br />
        <p>
          <b>Stats</b> can be found at the top right of the screen and will
          update when changes to the tracker are made.
        </p>
      </>
    ),
    hideCloseButton: true,
    hideFooter: true,
    spotlightClicks: true,
    disableBeacon: true,
    disableOverlayClose: true,
    styles: {
      options: {
        zIndex: 10000,
      },
    },
  },
];
