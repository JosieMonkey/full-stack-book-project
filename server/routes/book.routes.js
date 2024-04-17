import { Router } from "express";
import * as bookController from "../controllers/book.controllers.js";
const router = Router();

router
  .route("/books")
  .post(bookController.addBook)
  .get(bookController.getAllBooks);
router
  .route("/books/:id")
  .get(bookController.getBookById)
  .put(bookController.updateBookById)
  .delete(bookController.deleteBookById);

export default router;
