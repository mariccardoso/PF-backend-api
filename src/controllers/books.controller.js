import BooksModel from "../models/books.model.js";

class BookController {
  // GET /livros
  async getAllBooks(req, res) {
    const title = req.query.title;
    const author = req.query.author;
    const publisher = req.query.publisher;
    const publishedDate = req.query.publishedDate;
    const isbn = req.query.isbn;
    const language = req.query.language;
    const pageCount = req.query.pageCount;
    const coverImage = req.query.coverImage;
    const genres = req.query.genres;
    const description = req.query.description;
    const averageRating = req.query.averageRating;
    const ratingsCount = req.query.ratingsCount;

    const filters = {
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
    };

    const { page, limit } = req.query;

    try {
      const books = await BooksModel.findAll(
        filters,
        {
          page,
          limit,
        }
      );
      res.json(books);
    } catch (error) {
      console.error("Erro ao buscar os livros:", error);
      res.status(500).json({ error: "Erro ao buscar os livros" });
    }
  }

  // GET/livros/:id
  async getBookById(req, res) {
    try {
      const { id } = req.params;

      const book = await BooksModel.findById(id);

      if (!book) {
        return res.status(404).json({ error: "Livro não encontrado!" });
      }

      res.json(book);
    } catch (error) {
      console.error("Erro ao buscar livro:", error);
      res.status(500).json({ error: "Erro ao buscar livro!" });
    }
  }

  // POST/livros
  async createBook(req, res) {
    try {
      // Captura dos dados do corpo da requisição (frontend)
      const data = {
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
      } = req.body;

      // Verifica se todos os campos do livro foram fornecidos
      if (
        !title ||
        !author ||
        !isbn ||
        !coverImage ||
        !genres ||
        !description ||
        !averageRating 
      ) {
        return res.status(400).json({
          error:
            "Os campos título, autor, editora, data de publicação, ISBN, idioma, número de páginas, imagem de capa, gêneros, descrição e classificação média são obrigatórios",
        });
      }

      // Criar a nova Livro
      const newBook = await BooksModel.create(
        data
      );

      if (!newBook) {
        return res.status(400).json({ error: "Erro ao criar livro" });
      }

      res.status(201).json({
        message: "Livro criado com sucesso",
        newBook,
      });
    } catch (error) {
      console.error("Erro ao criar Livro:", error);
      res.status(500).json({ error: "Erro ao criar Livro" });
    }
  }

  // PUT/livros/:id
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
      } = req.body;

      // Atualizar o Livro
      const updatedBook = await BooksModel.update(
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
        averageRating
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

  // DELETE/livros/:id
  async deleteBook(req, res) {
    try {
      const { id } = req.params;

      // Remover o Livro
      const result = await BooksModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Livro não encontrado!" });
      }

      res.status(200).json({
        message: "Livro removido com sucesso",
      });
    } catch (error) {
      console.error("Erro ao remover Livro:", error);
      res.status(500).json({ error: "Erro ao remover Livro!" });
    }
  }
}

export default new BookController();