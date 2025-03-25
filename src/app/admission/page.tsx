"use client";

import React, { useState } from "react";

const Admission: React.FC = () => {
    const [formData, setFormData] = useState({
        studentName: "",
        age: "",
        parentName: "",
        contact: "",
        email: "",
        address: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Form submitted successfully!");
    };

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-lg max-w-2xl w-full p-8">
                <h2 className="text-3xl font-bold text-center text-[#7357a4]">Admission Form</h2>
                <p className="text-gray-600 text-center mt-2">Fill in the details to apply for admission</p>
                
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="studentName"
                            placeholder="Student's Name"
                            value={formData.studentName}
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
                            name="parentName"
                            placeholder="Parent/Guardian Name"
                            value={formData.parentName}
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
                    >
                        Submit Admission
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Admission;
