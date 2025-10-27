import React, { useState } from "react";
import { useUser } from "../customehooks/useUserHooks";
import { usePostData } from "../service/apiService";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

export default function EditTaskModal({ editingTask, isOpen, onClose, setEditingTask, handleSubmitEditData }) {
    const [taskData, setTaskData] = useState(editingTask || null);

    const user = useUser();
    const taskAdded = usePostData();




    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl animate-fadeIn">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    Add New Task
                </h2>

                <form onSubmit={handleSubmitEditData} className="space-y-4">

                    {/* Title */}
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={editingTask.title}
                        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 shadow-sm transition-all"
                    />


                    {/* Due Date & Status */}
                    <div className="flex gap-4">
                        {/* Due Date */}
                        <input
                            type="date"
                            value={editingTask.dueDate.split("T")[0]}
                            onChange={(e) =>
                                setEditingTask({ ...editingTask, dueDate: e.target.value })
                            }
                            min={new Date().toISOString().split("T")[0]} // today or later
                            className="w-1/2 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all"
                        />


                        {/* Status Dropdown */}
                        <select
                            value={editingTask.status}
                            onChange={(e) =>
                                setEditingTask({ ...editingTask, status: e.target.value })
                            }
                            className="w-1/2 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>


                    {/* Description */}
                    <textarea
                        placeholder="Task Description"
                        value={editingTask.description}
                        onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 shadow-sm transition-all resize-none"
                        rows={3}
                    />




                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            onClick={onClose}
                            type="button"
                            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all shadow-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
                        >
                            {
                                taskAdded?.loading ?
                                    <FaSpinner className="text-xl animate-spin" />
                                    :
                                    'Update Task'

                            }
                        </button>
                    </div>

                </form>

                {/* Close Icon */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-all"
                >
                    ✕
                </button>
            </div>
        </div>

    );
}
