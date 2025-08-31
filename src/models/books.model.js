import prisma from "../../prisma/prisma.js";

class BookModel {
  // Obter todos os livros
  async findAll(filters, pagination) {
    let { page, limit } = pagination; // corrigido para let

    const {
      title,
      author,
      publisher,
      publishedDate,
      isbn,
      language,
      pageCount,
      coverImage,
      genres,
      description,
      averageRating,
      ratingsCount,
    } = filters;

    // Normalização de paginação
    page = Number(page) < 1 || isNaN(Number(page)) ? 1 : Number(page);
    limit = Number(limit) < 1 || Number(limit) > 100 || isNaN(Number(limit)) ? 10 : Number(limit);

    const skip = (page - 1) * limit;

    const where = {};

    if (title) {
      where.title = { contains: title };
    }

    if (author) {
      where.author = { contains: author };
    }

    if (publisher) {
      where.publisher = { contains: publisher };
    }

    if (publishedDate) {
      where.publishedDate = { equals: new Date(publishedDate) };
    }

    if (isbn) {
      where.isbn = { equals: isbn };
    }

    if (language) {
      where.language = { contains: language };
    }

    if (averageRating) {
      where.averageRating = { gte: Number(averageRating) };
    }

    if (ratingsCount) {
      where.ratingsCount = { gte: Number(ratingsCount) };
    }

    if (genres) {
      // Agora genres é String[]
      where.genres = { hasSome: Array.isArray(genres) ? genres : [genres] };
    }

    const books = await prisma.book.findMany({
      skip,
      take: limit,
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalExibidos = books.length;
    const totalGeral = await prisma.book.count({ where });

    return { totalExibidos, totalGeral, books };
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
}

export default new BookModel();
