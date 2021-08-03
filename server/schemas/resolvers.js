const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    // me: async (parent, args, context) => {
    //   if (context.user) {
    //     return User.findOne({ _id: context.user._id });
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    me: async (parent, args) => {
        return User.findOne({ _id: context.user._id });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    addUser2: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      //const token = signToken(user);

      return {  user };
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    // Add a third argument to the resolver to access data in our `context`
    //saveBook: async (parent, { userId, bookToSave }, context) => {
    saveBook: async (parent, { userId, book} ) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
     // console.log(userId);
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { savedBooks: book },
        },
        {
          new: true,
          runValidators: true,
        }
      );




      

      // if (context.user) {
      // try {
      //   const updatedUser = await User.findOneAndUpdate(
      //     { _id: userId },
      //     { $addToSet: { savedBooks: book } },
      //     { new: true, runValidators: true }
      //   );
      //   return res.json(updatedUser);
      // } catch (err) {
      //   console.log(err);
      //   return res.status(400).json(err);
      // }


     

    //}
      // If user attempts to execute this mutation and isn't logged in, throw an error
      //throw new AuthenticationError('You need to be logged in!');
    },

    // saveBook: async (_,args) => {
    //   // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
    //   //if (context.user) {
    //     const updatedUser = await User.findOneAndUpdate(
    //       { _id: args.userId },
    //       { $addToSet: { savedBooks: args.input } },
    //       { new: true, runValidators: true }
    //     );

    //     return updatedUser;
    //  // }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
      
    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Make it so a logged in user can only remove a skill from their own profile
    deleteBook: async (parent, { book }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { books: book } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
