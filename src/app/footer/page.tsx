"use client";

import { useState } from "react";

export default function RegisterSummerCamp() {
    const [form, setForm] = useState({
        parentName: "",
        childName: "",
        age: "",
        contact: "",
        email: "",
        school: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const res = await fetch("/api/register-summer-camp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            let data;
            try {
                data = await res.json();
            } catch (jsonError) {
                console.error("Failed to parse JSON:", jsonError);
                throw new Error("Invalid server response");
            }

            if (res.ok) {
                setSubmitted(true);
                const upiUrl = `upi://pay?pa=yandapallisravankumar@oksbi&pn=Cocomelon%20Camp&am=250&cu=INR`;
                window.location.href = upiUrl;
            } else {
                setErrorMessage(data?.error || "Something went wrong!");
            }
        } catch (error) {
            console.error("Submit Error:", error);
            setErrorMessage("Failed to submit. Please check your connection.");
        }
    };

    if (submitted) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold">Thank you for registering! 🎉</h2>
                <p className="mt-4">Redirecting to UPI payment...</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Summer Camp Registration</h1>
            {errorMessage && (
                <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                {["parentName", "childName", "age", "contact", "email", "school"].map((field) => (
                    <input
                        key={field}
                        type="text"
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={form[field as keyof typeof form]}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required={field !== "email" && field !== "school"}
                    />
                ))}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
