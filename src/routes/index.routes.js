import express from "express";

// Importar todas as rotas
import bookRouter from "./book.routes.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Rotas públicas
router.use("/livros", bookRouter);

// Rotas protegidas
router.use(authMiddleware);

export default router;
