import { gql } from "@apollo/client";

export const AUTHENTICATE_WITH_GOOGLE_MUTATION = gql`
  mutation Mutation($input: GoogleAuthInput!) {
    authenticateWithGoogle(input: $input) {
      status
      message
    }
  }
`;

export const ADD_SINGLE_COMPANY_APPLICATION = gql`
  mutation Mutation($input: CompanyApplicationInput!) {
    addSingleCompanyApplication(input: $input) {
      id
      externalId
      companyName
      position
      awaitingResponse
      rejected
      nextRound
      receivedOffer
      notes
      appliedAt
      createdAt
      updatedAt
      unableToClassify
    }
  }
`;

export const UPDATE_SINGLE_COMPANY_APPLICATION = gql`
  mutation Mutation($input: CompanyApplicationInput!) {
    updateSingleCompanyApplication(input: $input) {
      id
      externalId
      companyName
      position
      awaitingResponse
      rejected
      nextRound
      receivedOffer
      notes
      appliedAt
      createdAt
      updatedAt
      unableToClassify
    }
  }
`;

export const IMPORT_COMPANY_APPLICATIONS = gql`
  mutation {
    importCompanyApplications {
      status
      message
      unableToClassifyCount
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

export const IMPORT_PROGRESS = gql`
  subscription ImportProgress {
    importProgress
  }
`;
