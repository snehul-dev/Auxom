import React, { useState } from 'react'
import toast from "react-hot-toast";
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/userService';
import authBackground from "../assets/authBackground.jpeg"

function Register() {
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""

    })
    const navigate = useNavigate()
    const [error, setError] = useState({})
    function handleInput(e) {
        const { value, name } = e.target

        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            toast.success("Registered successfully!")
            navigate("/login")

        },
        onError: () => {
            toast.error("Registration failed")
        }
    })
    function handleSubmit(e) {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors)
            return
        }

        const { confirmPassword, ...userData } = input
        mutation.mutate(userData)
    }

    const validate = () => {
        const err = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!input.fullName.trim()) {
            err.fullName = "Please enter your name"
        }
        if (!input.email.trim()) {
            err.email = "Email is required"
        } else if (!emailRegex.test(input.email)) {
            err.email = "Invalid email formate"
        }
        if (!input.password.trim()) {
            err.password = "Password is required"
        } else if (input.password.length < 4) {
            err.password = "Need atleast 4 characters"
        } else if (input.password.length > 10) {
            err.password = "Maximum 10 characters"
        }
        if (!input.confirmPassword.trim()) {
            err.confirmPassword = "Re-enter your password"
        } else if (input.password !== input.confirmPassword) {
            err.confirmPassword = "Passwords do not match"
        }
        return err
    }

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage:
                   `url(${authBackground})`,
            }}
        >
            <div className="absolute inset-0 bg-black/50"></div>

            <form
                onSubmit={handleSubmit}
                noValidate
                className="relative z-10 w-[350px] text-center text-white"
            >
                <h1 className="text-2xl tracking-widest mb-6">Register Now</h1>

                <input
                    name="fullName"
                    placeholder="Full Name"
                    value={input.fullName}
                    onChange={handleInput}
                    className="w-full mb-2 px-4 py-3 rounded-full bg-white/20 placeholder-white border border-white/30 backdrop-blur-md focus:outline-none"
                />
                <p className="text-red-300 text-sm mb-2">{error.fullName}</p>

                <input
                    name="email"
                    placeholder="Email@example.com"
                    value={input.email}
                    onChange={handleInput}
                    className="w-full mb-2 px-4 py-3 rounded-full bg-white/20 placeholder-white border border-white/30 backdrop-blur-md focus:outline-none"
                />
                <p className="text-red-300 text-sm mb-2">{error.email}</p>

                <input
                    name="password"
                    placeholder="Password"
                    value={input.password}
                    onChange={handleInput}
                    className="w-full mb-2 px-4 py-3 rounded-full bg-white/20 placeholder-white border border-white/30 backdrop-blur-md focus:outline-none"
                />
                <p className="text-red-300 text-sm mb-2">{error.password}</p>

                <input
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={input.confirmPassword}
                    onChange={handleInput}
                    className="w-full mb-2 px-4 py-3 rounded-full bg-white/20 placeholder-white border border-white/30 backdrop-blur-md focus:outline-none"
                />
                <p className="text-red-300 text-sm mb-3">{error.confirmPassword}</p>

                <button
                    type="submit"
                    className="w-full bg-[#4fd1c5] text-white py-3 rounded-full hover:opacity-90 transition"
                >
                    {mutation.isPending ? "Registering..." : "Register"}
                </button>

                <p className="text-sm mt-4 text-gray-300">
                    Already have an account?{" "}
                    <span
                        className="text-white cursor-pointer underline"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Register