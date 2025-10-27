import React, { useEffect, useState } from "react";
import { useUser } from "../../customehooks/useUserHooks";
import { useDispatch } from "react-redux";
import { FaPlus, FaSpinner, FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlices";
import { dologout } from "../../service/localstroageService";
import { useDeleteData, useEditData, usePostData, useRetrieveData } from "../../service/apiService";
import { FiEdit, FiTrash2 } from "react-icons/fi"
import Gettask from "../../components/Gettask";
import AddTaskModal from "../../components/AddTaskModal";
import EditTaskModal from "../../components/EditTaskModal";
import { toast } from "react-toastify";

export default function Dashboard() {
    const user = useUser(); // returns { user, token, isAuthenticated }
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const getTaskBasedOnUser = useRetrieveData();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editingTask, setEditingTask] = useState(null);
    const taskEdit = useEditData();

    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 6; // tasks per page
    const deleteData = useDeleteData();

    //get data

    const getTask = async () => {
        setLoading(true);
        // Pass page & limit as query params
        const res = await getTaskBasedOnUser?.fetchDataFromApi(`/getAllTask?page=${currentPage}&limit=${limit}`);
        console.log(res);
        setTasks(res.data.tasks);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
        setLoading(false);
    }

    useEffect(() => {

        getTask();
    }, [currentPage, isModalOpen]); // ✅ include currentPage

    //add data
    const handleEdit = (taskId) => {
        const taskToEdit = tasks.find((task) => task._id === taskId);
        setEditingTask({ ...taskToEdit }); // clone as object
    };



    const handleSubmitEditData = async (e) => {

        e.preventDefault();

        if (!editingTask.title || !editingTask.description || !editingTask.dueDate) {
            toast.error("Please fill all fields");
            return;
        }
        // onAddTask(taskData);

        const updteData = {
            ...editingTask,
            userId: user?._id
        }

        console.log(updteData);

        try {
            const resp = await taskEdit?.postRequestData(`/update/${editingTask?._id}`, updteData);
            console.log(resp);

            toast.success(resp?.message);
            getTask();

        } catch (error) {
            toast.error(error?.message);
        }


        setEditingTask(null);
        // onClose();
    };

    const handleDelete = async (taskId) => {

        console.log(taskId);

        try {
            const resp = await deleteData?.postRequestData(`/delete/${taskId}`);
            console.log(resp);

            toast.success(resp?.message);
            getTask();

        } catch (error) {
            toast.error(error?.message);
        }


    }


    const handleLogout = () => {
        dologout(() => {
            navigation("/");
            dispatch(logout());
        });
    };

    return (
        <>
            <div className="w-full bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 shadow-md py-2 px-2">
                <div className="flex justify-between items-center">
                    {/* User Profile Box */}
                    <div className="flex items-center gap-2 backdrop-blur-xl px-5 py-3 rounded-2xl transition-all duration-300">
                        <div className="relative">
                            <FaUserCircle className="text-white drop-shadow-lg text-xl" />
                            {/* <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white"></span> */}
                        </div>

                        <div className="text-white">
                            <h2 className="text-sm font-semibold tracking-wide">
                                {user?.name || "Guest User"}
                            </h2>
                            <p className="text-sm text-gray-200">{user?.user?.email}</p>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2  text-white px-5 py-1 rounded-xl  backdrop-blur-md hover:text-red-600 transition-all duration-300 cursor-pointer font-bold"
                    >
                        <IoMdLogOut className="text-xl" />
                        Logout
                    </button>

                </div>
            </div>


            {
                getTaskBasedOnUser?.loading === false && tasks.length === 0 ?
                    <div className="flex flex-col justify-center items-center h-[90vh] text-center text-gray-500">
                        <div className="text-6xl mb-4">🗒️</div>
                        <h2 className="text-2xl font-semibold">No Tasks Yet</h2>
                        <p className="text-gray-400 mt-2">Create your first task to get started!</p>
                    </div>

                    :
                    <div className="p-6 bg-gray-100 h-[91vh]">


                        {getTaskBasedOnUser?.loading ? (
                            <div className="flex justify-center items-center h-[90vh]">
                                <FaSpinner className="text-3xl text-black animate-spin" />
                            </div>
                        ) : (
                            <>
                                <Gettask tasks={tasks} handleEdit={handleEdit} handleDelete={handleDelete} />

                                {/* Pagination */}
                                <div className="flex justify-center mt-6 gap-2 items-center">
                                    {/* Previous Button */}
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>

                                    {/* Page Numbers */}
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-3 py-1 rounded-full transition-colors duration-200 ${currentPage === page
                                                    ? "bg-purple-600 text-white shadow-lg"
                                                    : "bg-gray-200 text-gray-700 hover:bg-purple-100"
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Next Button */}
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>

                            </>

                        )}


                    </div>
            }


            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 bg-green-500 text-white w-10 h-10 flex justify-center items-center rounded-full shadow-lg hover:bg-green-600 transition-all z-50"
            >
                <FaPlus />
            </button>




            <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />


            <EditTaskModal
                isOpen={editingTask}
                onClose={() => setEditingTask(null)}

                editingTask={editingTask}
                setEditingTask={setEditingTask}
                handleSubmitEditData={handleSubmitEditData}
            // onAddTask={handleAddTask}
            />


        </>
    );
}
