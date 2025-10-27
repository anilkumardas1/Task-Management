import React, { useState } from "react";
import { usePostDataForPublicApi } from "../../service/apiService";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { dologin } from "../../service/localstroageService";
import { loginUser } from "../../redux/userSlices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true); // Toggle login/register
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const authFormData = usePostDataForPublicApi();
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
            toast.error("Please fill all required fields");
            return;
        }
        if (!isLogin && formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        console.log("Form Submitted:", formData);
        if (isLogin) {

            try {

                const resp = await authFormData?.postRequestData('/login', formData);
                console.log(resp);

                if (resp?.success || resp?.data?.success) {

                    const combinedData = {
                        user: resp?.user,
                        token: resp?.token,
                    }

                    console.log(combinedData);


                    dologin(combinedData, () => {
                        dispatch(loginUser(combinedData));
                        toast.success(resp?.message)
                        navigation('/dashboard')
                    });

                } else {
                    toast.error(resp?.data?.message)

                }


            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || error?.message)

            }

        } else {
            const resp = await authFormData?.postRequestData('/register', formData);
            console.log(resp);

            toast.success(resp?.message);
            setIsLogin(true);

        }

        // Call API here
    };

    return (
        <div className="flex items-center justify-center h-[100vh] bg-gradient-to-r from-purple-500 to-indigo-500 ">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
                <h2 className="text-2xl font-bold text-center mb-6">
                    {isLogin ? "Login" : "Register"}
                </h2>



                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="********"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[38px] cursor-pointer text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </span>
                    </div>

                    {!isLogin && (
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="********"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <span
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-[38px] cursor-pointer text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </span>
                        </div>
                    )}


                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition flex justify-center items-center"
                    >
                        {
                            authFormData?.loading ?
                                <FaSpinner className="animate-spin text-lg" />
                                :
                                isLogin ? "Login" : "Register"

                        }
                    </button>

                </form>

                <p className="text-center mt-4 text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span
                        className="text-purple-600 cursor-pointer font-semibold"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "Register" : "Login"}
                    </span>
                </p>
            </div>
        </div>
    );
}
