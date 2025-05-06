import mongoose, { Schema, Types } from "mongoose";

const todoSchema = new Schema({
    title : {
        type: String,
        required: true,
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

export const Todo = mongoose.model("Todo", todoSchema);