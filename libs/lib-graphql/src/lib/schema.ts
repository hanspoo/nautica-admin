import { BooksService } from './BooksService';

export const resolvers = {
  Query: {
    books: () => BooksService.findAll(),
  },
};
