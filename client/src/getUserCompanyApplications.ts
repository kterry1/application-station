import { gql } from "@apollo/client";

export const GET_USER_COMPANY_APPLICATIONS = gql`
  query User($email: String!) {
    user(email: $email) {
      id
      name
      email
      isAuthenticated
      companyApplications {
        id
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
      }
    }
  }
`;
