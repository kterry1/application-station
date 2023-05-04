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
