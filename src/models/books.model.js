import prisma from "../../prisma/prisma.js";

class BookModel {
  // Obter todos os livros
  async findAll() {

    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });


    return { books };
  }

  // Obter um livro pelo ID
  async findById(id) {
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });
    return book;
  }

  // Criar um novo livro
  async create(
    title,
    author,
    publisher,
    publishedDate,
    isbn,
    language,
    pageCount,
    coverImage,
    genres,
    synopsis,
    authorBio,
    description,
    averageRating,
    ratingsCount
  ) {
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        publisher,
        publishedDate,
        isbn,
        language,
        pageCount,
        synopsis,
        authorBio,
        coverImage,
        genres: Array.isArray(genres) ? genres : genres ? [genres] : [],
        description,
        averageRating,
        ratingsCount,
      },
    });

    return newBook;
  }

  // Atualizar um livro
  async update(
    id,
    title,
    author,
    publisher,
    publishedDate,
    isbn,
    language,
    pageCount,
    coverImage,
    genres,
    synopsis,

    description,
    averageRating,
    ratingsCount
  ) {
    const book = await this.findById(id);

    if (!book) {
      return null;
    }

    const updatedBook = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        title,
        author,
        publisher,
        publishedDate,
        isbn,
        synopsis,
        authorBio,
        language,
        pageCount,
        coverImage,
        genres: Array.isArray(genres) ? genres : genres ? [genres] : [],
        description,
        averageRating,
        ratingsCount,
      },
    });

    return updatedBook;
  }

  // Remover um livro
  async delete(id) {
    const book = await this.findById(id);

    if (!book) {
      return null;
    }

    await prisma.book.delete({
      where: { id: Number(id) },
    });

    return true;
  }

  // remover todos os livros

  async deleteAll() {
    const allBooks = await prisma.book.findMany();

    if (allBooks.length === 0) {
      return null;
    }

    await prisma.book.deleteMany();

    return true;
  }
}

export default new BookModel();
