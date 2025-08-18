import { Book } from '@nautica/api';
import { prisma } from '@nautica/lib-prisma';
import { BookDAO } from '@prisma/client';

export class BooksService {
  static async findById(id: string) {
    const book = await prisma.bookDAO.findFirst({
      where: {
        id,
      },
    });

    if (book == null) throw Error(`Book ${id} not found`);

    return bookDTOToGraphql(book);
  }

  static async findAll() {
    const all = await prisma.bookDAO.findMany();
    return all.map((b) => bookDTOToGraphql(b as any));
  }
}

function bookDTOToGraphql(book: BookDAO) {
  const b: Book = {
    author: book.author,
    title: book.title,
  };

  return b;
}
