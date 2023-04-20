import express from "express";
import { 
    getBook, 
    updateBook, 
    updateScore, 
    deleteBook} from "../controllers/books.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/", verifyToken, getBook);

// Update
router.patch("/:id", verifyToken, updateBook);
router.patch("/:id/score", verifyToken, updateScore);

// Delete
router.delete("/:id", verifyToken, deleteBook);

export default router;