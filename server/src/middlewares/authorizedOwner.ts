import { NextFunction, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "./auth";
import { Todo } from "../models/todo";

const authorizedOwner = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const {todoId} = req.params;

    const todo = await Todo.findById(todoId);
    if(!todo) {
        res.status(404);
        throw new Error("Todo not found.");
    }

    if(todo.userId?.toString() !== req.user?._id.toString()) {
        res.status(403);
        throw new Error("You are not the owner.")
    }

    next();
})

export {authorizedOwner};