"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Admission: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        student_name: "",  
        age: "",
        parent_name: "",
        contact: "",
        email: "",
        address: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage("");

        try {
            const response = await fetch("/api/admission", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setResponseMessage("Form submitted successfully!");
                setFormData({
                    student_name: "",
                    age: "",
                    parent_name: "",
                    contact: "",
                    email: "",
                    address: "",
                    message: "",
                });
            } else {
                setResponseMessage(data.error || "Something went wrong!");
            }
        } catch {
            setResponseMessage("Server error. Please try again later."); // ✅ Removed `error` variable
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-lg max-w-2xl w-full p-8">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="mb-4 px-4 py-2 bg-[#7357a4] text-white rounded-full font-semibold shadow-md hover:bg-[#5e4694] transition"
                >
                    ⬅ Back
                </button>
                <h2 className="text-3xl font-bold text-center text-[#7357a4]">Admission Form</h2>
                <p className="text-gray-600 text-center mt-2">Fill in the details to apply for admission</p>

                {responseMessage && (
                    <p className="text-center mt-2 text-lg text-green-600">{responseMessage}</p>
                )}

                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="student_name"
                            placeholder="Student's Name"
                            value={formData.student_name}
                            onChange={handleChange}
                            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#7357a4] placeholder:text-gray-500 text-gray-900"
                            required
                        />
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={formData.age}
                            onChange={handleChange}
                            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#7357a4] placeholder:text-gray-500 text-gray-900"
                            required
                        />
                        <input
                            type="text"
                            name="parent_name"
                            placeholder="Parent/Guardian Name"
                            value={formData.parent_name}
                            onChange={handleChange}
                            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#7357a4] placeholder:text-gray-500 text-gray-900"
                            required
                        />
                        <input
                            type="tel"
                            name="contact"
                            placeholder="Contact Number"
                            value={formData.contact}
                            onChange={handleChange}
                            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#7357a4] placeholder:text-gray-500 text-gray-900"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#7357a4] placeholder:text-gray-500 text-gray-900"
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#7357a4] placeholder:text-gray-500 text-gray-900"
                        />
                    </div>
                    <textarea
                        name="message"
                        placeholder="Additional Message (Optional)"
                        value={formData.message}
                        onChange={handleChange}
                        className="border p-3 rounded w-full h-28 mt-4 focus:outline-none focus:ring-2 focus:ring-[#7357a4] placeholder:text-gray-500 text-gray-900"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-[#7357a4] text-white py-3 mt-4 rounded-lg hover:bg-[#5e4694] transition-all"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Admission"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Admission;
