import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      firstName
      lastName
      fatherName
      phoneNumber
      cnic
      houseNumber
      createdAt
    }
  }
`;