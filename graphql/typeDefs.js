

const { gql } = require('apollo-server');

module.exports = gql`
type User {
    id: ID!
    firstName: String!
    lastName: String!
    fatherName: String!
    phoneNumber: String!
    cnic: String!
    houseNumber: String!
    createdAt: String!
}

input UserInput {
    firstName: String!
    lastName: String!
    fatherName: String!
    phoneNumber: String!
    cnic: String!
    houseNumber: String!
}

type Query {
    user(ID: ID!): User!
    getUsers: [User]
}

type Mutation {
    createUser(userInput: UserInput): User!
    deleteUser(ID: ID!): Boolean!
    editUser(ID: ID!, userInput: UserInput): User!
}



type Recipe {
    id: ID!
    name: String!
    description: String!
    createdAt: String!
    thumbsUp: Int
    thumbsDown: Int
}

input RecipeInput {
    name: String!
    description: String!
}

type Query {
    recipe(ID: ID!): Recipe!
    getRecipes(amount: Int): [Recipe]
}

type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(ID: ID!): Boolean!
    editRecipe(ID: ID!, recipeInput: RecipeInput): Recipe!
}

`;

