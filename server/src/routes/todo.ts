import { Router } from "express";
import { createNewTodo, deleteTodo, getTodo, getTodos, updateTodo } from "../controllers/todo";
import { protect } from "../middlewares/auth";
import { authorizedOwner } from "../middlewares/authorizedOwner";


const router = Router();

router.post("/create", protect, createNewTodo);
router.get("/todos", getTodos);
router.get("/todos/:todoId", getTodo);
router.put("/todos/:todoId", protect, authorizedOwner, updateTodo);
router.delete("/todos/:todoId", protect, authorizedOwner, deleteTodo);

export default router;