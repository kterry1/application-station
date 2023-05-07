import { gql } from "@apollo/client";

export const AUTHENTICATE_WITH_GOOGLE_MUTATION = gql`
  mutation Mutation($input: GoogleAuthInput!) {
    authenticateWithGoogle(input: $input) {
      status
      message
    }
  }
`;

export const IMPORT_COMPANY_APPLICATIONS = gql`
  mutation {
    importCompanyApplications {
      status
      message
    }
  }
`;

export const GET_COMPANY_APPLICATIONS = gql`
  query Query {
    companyApplications {
      id
      externalId
      companyName
      position
      awaitingResponse
      rejected
      nextRound
      receivedOffer
      acceptedOffer
      notes
      appliedAt
      createdAt
      updatedAt
      unableToClassify
    }
  }
`;

export const GET_LOGGED_IN_USER = gql`
  query LoggedInUser {
    loggedInUser {
      id
      name
      email
      role
    }
  }
`;

export const DELETE_COMPANY_APPLICATIONS = gql`
  mutation DeleteCompanyApplications($input: DeleteCompanyApplicationsInput!) {
    deleteCompanyApplications(input: $input) {
      status
      message
    }
  }
`;

export const LOG_OUT_USER = gql`
  mutation {
    logOutUser {
      status
      message
    }
  }
`;

export const GET_WEEKLY_STATS = gql`
  query GetWeeklyStats {
    getWeeklyStats {
      lastWeek {
        applicationCount
        responseCount
        nextRoundCount
        rejectionCount
      }
      thisWeek {
        applicationCount
        responseCount
        nextRoundCount
        rejectionCount
      }
    }
  }
`;
