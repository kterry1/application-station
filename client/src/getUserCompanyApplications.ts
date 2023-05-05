import { gql } from "@apollo/client";

export const AUTHENTICATE_WITH_GOOGLE_MUTATION = gql`
  mutation Mutation($input: GoogleAuthInput!) {
    authenticateWithGoogle(input: $input) {
      responseMessage
    }
  }
`;

export const IMPORT_MULTIPLE_COMPANY_APPLICATIONS = gql`
  mutation {
    importCompanyApplications {
      responseMessage
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
