import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
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

export const DELETE_USER = gql`
  mutation DeleteUser($ID: ID!) {
    deleteUser(ID: $ID)
  }
`;

export const EDIT_USER = gql`
  mutation EditUser($ID: ID!, $userInput: UserInput!) {
  editUser(ID: $ID, userInput: $userInput) {
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

