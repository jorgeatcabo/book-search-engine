const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    authors: [String]!
    description: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    books: [Book]!
    book(bookId: ID!): Book
  }

  type Mutation {
    addBook(description: String!,  image: String!, link: String!, title: String!): Auth
    login(email: String!, password: String!): Auth

    addBook(bookId: ID!, author: String!): Book
    removeBook(bookId: ID!): Book
    removeAuthor(bookId: ID!, author: String!): Book
  }
`;

module.exports = typeDefs;
