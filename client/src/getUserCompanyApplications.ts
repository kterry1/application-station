import { gql } from "@apollo/client";

export const AUTHENTICATE_WITH_GOOGLE_MUTATION = gql`
  mutation Mutation($input: AuthenticateWithGoogleInput!) {
    authenticateWithGoogle(input: $input) {
      jwt
    }
  }
`;

export const IMPORT_MULTIPLE_COMPANY_APPLICATIONS = gql`
  mutation Mutation($input: AuthenticateWithGoogleInput!) {
    importMultipleCompanyApplications(input: $input)
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
