import express from "express";
import{
    readUser,
    readUserRecentBooks,
    readAllUsers,
    updateUser,
    deleteUser
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* ======= PRODUCTION ======= */
// // Read
// router.get("/:id", verifyToken, readUser);

// // Update
// router.patch("/:id/:ISBN", verifyToken, updateUser);

// // Delete
// router.delete("/:id", verifyToken, deleteUser);

/* ======= TESTING ======= */
// Read
router.get("/", readAllUsers);
router.get("/:id", readUser);

// Update
router.patch("/:id", updateUser);

// Delete
router.delete("/:id", deleteUser);

export default router;