import express from "express";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";
import { createTask, getTasks } from "../controllers/taskController.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/", protect, upload.single("attachment"), createTask);
router.get("/", protect, getTasks);

export default router;
