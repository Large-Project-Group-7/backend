import express from "express";
import { 
    readBook,
    readAllBooks, 
    updateBook, 
    updateScore, 
    deleteBook} from "../controllers/books.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* ======= PRODUCTION ======= */
// // Read
// router.get("/", verifyToken, readBook);

// // Update
// router.patch("/:id", verifyToken, updateBook);
// router.patch("/:id/score", verifyToken, updateScore);

// // Delete
// router.delete("/:id", verifyToken, deleteBook);

/* TESTING ROUTES REMOVE THESE WHEN ON PROD */

// Read
router.get("/", readAllBooks);
router.get("/:id", readBook);

// Update
router.patch("/:id", updateBook);

// Delete
router.delete("/:id", deleteBook);

export default router;