import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    status: { type: String, default: "Pending" },
    dueDate: Date
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
