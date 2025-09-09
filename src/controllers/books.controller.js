import BookModel from "../models/books.model.js";

class BookController {
  // GET /livros
  async getAllBooks(req, res) {
    const filters = { ...req.query };
    const { page, limit } = req.query;

    try {
      const books = await BookModel.findAll(filters, { page, limit });
      res.json(books);
    } catch (error) {
      console.error("Erro ao buscar os livros:", error);
      res.status(500).json({ error: "Erro ao buscar os livros" });
    }
  }

  // GET /livros/:id
  async getBookById(req, res) {
    try {
      const { id } = req.params;
      const book = await BookModel.findById(id);

      if (!book) {
        return res.status(404).json({ error: "Livro não encontrado!" });
      }

      res.json(book);
    } catch (error) {
      console.error("Erro ao buscar livro:", error);
      res.status(500).json({ error: "Erro ao buscar livro!" });
    }
  }

  // POST /livros
  async createBook(req, res) {
    try {
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
        synopsis,
        authorBio,
        description,
        averageRating,
        ratingsCount,
      } = req.body;

      if (!title || !author || !isbn) {
        return res.status(400).json({
          error: "Os campos título, autor e ISBN são obrigatórios",
        });
      }

      const newBook = await BookModel.create(
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
        genres,
        description,
        averageRating,
        ratingsCount
      );

      res.status(201).json({
        message: "Livro criado com sucesso",
        newBook,
      });
    } catch (error) {
      console.error("Erro ao criar Livro:", error);
      res.status(500).json({ error: "Erro ao criar Livro" });
    }
  }

  // PUT /livros/:id
  async updateBook(req, res) {
    try {
      const { id } = req.params;
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
        synopsis,
        authorBio,
      } = req.body;

      const updatedBook = await BookModel.update(
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
        description,
        averageRating,
        ratingsCount,
        synopsis,
        authorBio
      );

      if (!updatedBook) {
        return res.status(404).json({ error: "Livro não encontrado" });
      }

      res.json(updatedBook);
    } catch (error) {
      console.error("Erro ao atualizar Livro:", error);
      res.status(500).json({ error: "Erro ao atualizar Livro!" });
    }
  }

  // DELETE /livros/:id
  async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const result = await BookModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Livro não encontrado!" });
      }

      res.status(200).json({ message: "Livro removido com sucesso" });
    } catch (error) {
      console.error("Erro ao remover Livro:", error);
      res.status(500).json({ error: "Erro ao remover Livro!" });
    }
  }

  //DELETE ALL BOOKS
  async deleteAllBooks(req, res) {
    try {
      const result = await BookModel.deleteAll();

      if (!result) {
        return res.status(404).json({ error: "Nenhum livro encontrado!" });
      }

      res.status(200).json({ message: "Todos os livros foram removidos com sucesso" });
    } catch (error) {
      console.error("Erro ao remover todos os livros:", error);
      res.status(500).json({ error: "Erro ao remover todos os livros!" });
    }
  }

}

export default new BookController();
