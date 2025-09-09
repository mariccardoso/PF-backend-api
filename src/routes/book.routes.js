import express from "express";
import BookController from "../controllers/books.controller.js";

const bookRouter = express.Router();

// Rotas de Livros
// GET /livros - Listar todos os Livros
bookRouter.get("/", BookController.getAllBooks);

// GET /livros/:id - Obter um Livro pelo ID
bookRouter.get("/:id", BookController.getBookById);

// POST /livros - Criar um novo Livro
bookRouter.post("/", BookController.createBook);

// PUT /livros/:id - Atualizar um Livro
bookRouter.put("/:id", BookController.updateBook);

// DELETE /livros/:id - Remover um Livro
bookRouter.delete("/:id", BookController.deleteBook);

// DELETE /livros - Remover todos os  Livros
bookRouter.delete("/", BookController.deleteAllBooks);

export default bookRouter;
