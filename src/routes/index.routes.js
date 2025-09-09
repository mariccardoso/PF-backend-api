import express from "express";

// Importar todas as rotas
import bookRouter from "./book.routes.js";

const router = express.Router();

// Rotas públicas
router.use("/livros", bookRouter);

export default router;
