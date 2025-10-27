import React, { useState } from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

export default function Gettask({ tasks, handleEdit, handleDelete }) {

    const [taskToDelete, setTaskToDelete] = useState(null);


    return (
        <>
            <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task) => (
                    <div
                        key={task._id}
                        className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 relative group"
                    >
                        {/* Status Badge */}
                        <span
                            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${task.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                                }`}
                        >
                            {task.status}
                        </span>

                        {/* Task Title */}
                        <h2 className="text-gray-800 text-xl font-bold mb-2">{task.title}</h2>

                        {/* Description */}
                        <p className="text-gray-600 mb-4 line-clamp-3">{task.description}</p>

                        {/* Due Date */}
                        <p className="text-gray-400 text-sm mb-4">Due: {new Date(task.dueDate).toLocaleDateString()}</p>

                        {/* Icon Buttons (appear on hover) */}
                        <div className="flex gap-3  transition-opacity duration-200 absolute bottom-4 right-4">
                            <button
                                onClick={() => handleEdit(task._id)}
                                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition-all duration-200"
                            >
                                <FiEdit size={18} />
                            </button>
                            <button
                                onClick={() => setTaskToDelete(task)}
                                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-all duration-200"
                            >
                                <FiTrash2 size={18} />
                            </button>

                        </div>
                    </div>
                ))}
            </div>


            {taskToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p className="mb-6">
                            Are you sure you want to delete "<span className="font-semibold">{taskToDelete.title}</span>"?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setTaskToDelete(null)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleDelete(taskToDelete._id);
                                    setTaskToDelete(null);
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}
