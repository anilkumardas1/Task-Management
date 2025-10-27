import express from "express";
import { auth } from "../middleware/auth.js";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/createTask", auth, createTask);
router.get("/getAllTask", auth, getTasks);
router.put("/update/:_id", auth, updateTask);
router.delete("/delete/:id", auth, deleteTask);

export default router;
