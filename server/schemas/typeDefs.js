const { gql } = require('apollo-server-express');
const bookSchema = require('../models/Book');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]!
  }

  type Book {
    authors: [String]
    bookId: String
    title: String
    description: String
    image: String
  }
  
  input BookInput {
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
    loginUser(email: String!, password: String!): Auth
    saveBook(input: BookInput): User
    removeUser(userId: ID!): User
    deleteBook(bookId: String!): User
  }
`;
module.exports = typeDefs;
