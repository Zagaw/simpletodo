import { Router } from "express";
import { createNewTodo, deleteTodo, getTodo, getTodos, updateTodo } from "../controllers/todo";


const router = Router();

router.post("/create", createNewTodo);
router.get("/todos", getTodos);
router.get("/todos/:todoId", getTodo);
router.put("/todos/:todoId", updateTodo);
router.delete("/todos/:todoId", deleteTodo);

export default router;