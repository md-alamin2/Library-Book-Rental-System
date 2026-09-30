import { Router } from "express";
import { booksController } from "./book.controller";
import verifyRole from "../../middleware/verifyRole";

const router = Router();

router.post("/", verifyRole("librarian"), booksController.addBooks);

router.get("/", booksController.getAllBooks);

router.get("/:bookId", booksController.getSingleBook)

router.put("/:bookId", verifyRole("librarian"), booksController.updateBook)

router.delete("/:bookId", verifyRole("librarian"), booksController.deleteBook)

export const booksRoutes = router;
