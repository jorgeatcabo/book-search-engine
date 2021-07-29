const { AuthenticationError } = require('apollo-server-express');
const { Profile } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    books: async () => {
      return Book.find();
    },

    book: async (parent, { bookId }) => {
      return Book.findOne({ _id: bookId });
    },
  },

  Mutation: {
    addBook: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ description, image, link, title});
      const token = signToken(book);

      return { token, book };
    },
    // login: async (parent, { email, password }) => {
    //   const profile = await Profile.findOne({ email });

    //   if (!profile) {
    //     throw new AuthenticationError('No profile with this email found!');
    //   }

    //   const correctPw = await profile.isCorrectPassword(password);

    //   if (!correctPw) {
    //     throw new AuthenticationError('Incorrect password!');
    //   }

    //   const token = signToken(profile);
    //   return { token, profile };
    // },

    addBook: async (parent, { bookId, author }) => {
      return Book.findOneAndUpdate(
        { _id: bookId },
        {
          $addToSet: { authors: author },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeBook: async (parent, { bookId }) => {
      return Book.findOneAndDelete({ _id: bookId });
    },
    removeAuthor: async (parent, { bookId, author }) => {
      return Book.findOneAndUpdate(
        { _id: bookId },
        { $pull: { author: author } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
