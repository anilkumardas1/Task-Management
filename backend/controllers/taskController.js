import Task from "../models/Task.js";

// CREATE TASK
export const createTask = async (req, res) => {
    try {
        const task = await Task.create({ ...req.body, userId: req.userId });
        res.json({ message: "Task Created", task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET USER TASKS
// export const getTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find({ userId: req.userId });
//         res.json(tasks);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

export const getTasks = async (req, res) => {
    try {
        // Get page & limit from query, with defaults
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1;

        // Calculate how many documents to skip
        const skip = (page - 1) * limit;

        // Fetch paginated tasks
        const tasks = await Task.find({ userId: req.userId })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // optional sorting

        // Count total tasks
        const totalCount = await Task.countDocuments({ userId: req.userId });

        res.json({
            tasks,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalCount
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// UPDATE TASK
export const updateTask = async (req, res) => {
    try {

        // console.log(req.body);
        console.log(req.params?._id, req.userId);


        const task = await Task.findOneAndUpdate(
            { _id: req.params._id, userId: req.userId },
            req.body,
            { new: true }
        );
        res.json({ message: "Task Updated", task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
    try {

        console.log(req);


        await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        res.json({ message: "Task Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
