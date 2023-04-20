import express from "express";
import{
    getUser,
    getRecentBooks,
    getReviews,
    addRecentBook,
    addReview,
    deleteUser,
    deleteReview,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/:id", verifyToken, getUser);
router.get("/:id/recent", verifyToken, getRecentBooks);
router.get("/:id/reviews", verifyToken, getReviews);

// Update
router.patch("/:id/:ISBN", verifyToken, addRecentBooks);
router.patch("/:id/:reviews", verifyToken, addReviews);

// Delete
router.delete("/:id", verifyToken, deleteUser);
// This should just delete a single entry from the reviews map
router.delete("/:id/:reviews", verifyToken, deleteReviews);

export default router;