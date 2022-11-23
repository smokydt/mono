import { Resolvers } from './graphql/generated/types';
import { pubsub } from './publisher';
import { books, comments } from './data';
import { v4 } from 'uuid';

export const resolvers: Resolvers = {
  Query: {
    books: () => books,
    comments: () => {
      console.log(`returning comments: ${JSON.stringify(comments)}`);
      return comments;
    },
  },
  Mutation: {
    addBook: (parent, { title, author }, context, info) => {
      const id = v4();

      const book = { id, title, author };

      books.push(book);

      return book;
    },
  },
  Subscription: {
    commentAdded: {
      subscribe: () =>
        pubsub.asyncIterator('COMMENT_ADDED') as unknown as AsyncIterable<any>,
    },
  },
};
