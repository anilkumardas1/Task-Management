import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER USER
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.json({ message: "User registered successfully", user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// LOGIN USER
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        const userData = user.toObject();
        delete userData.password;


        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: userData
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

};
