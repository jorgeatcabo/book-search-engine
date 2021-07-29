const { gql } = require('apollo-server-express');
const bookSchema = require('../models/Book');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [savedBooks]!
  }

  type savedBooks {
    authors: [String]
    bookId: String
    title: String
    description: String
    image: String
  }
  


  type Auth {
    token: ID!
    user: User
  }
 
  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addBook(userId: ID!, book: String!): User
    removeUser(userId: ID!): User
    removeBook(userId: ID!, book: String!): User
  }
`;


module.exports = typeDefs;
