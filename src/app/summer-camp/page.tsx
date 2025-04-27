"use client";

import React, { useState } from "react";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";  // Import the QR code generator

interface FormData {
    parentName: string;
    childName: string;
    age: string;
    contact: string;
    email: string;
    school: string;
}

const SummerCampPage = () => {
    const [form, setForm] = useState<FormData>({
        parentName: "",
        childName: "",
        age: "",
        contact: "",
        email: "",
        school: "",
    });

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // For displaying errors

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(""); // Clear previous errors

        try {
            const res = await fetch("/api/register-summer-camp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json(); // Parse the response body

            if (res.ok) {
                setSubmitted(true);
                // Redirect to UPI payment
                const upiUrl = `upi://pay?pa=yandapallisravankumar@oksbi&pn=Cocomelon%20Camp&am=250&cu=INR`;
                window.location.href = upiUrl;
            } else {
                // Handle errors from the server
                if (data && data.error) {
                    setErrorMessage(data.error);
                } else {
                    setErrorMessage("Something went wrong!");
                }
            }
        } catch (error) {
            console.error("Frontend Error:", error);
            setErrorMessage("Failed to submit. Please check your connection.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-violet-200 py-12 px-4 sm:px-8">
            <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8 border border-violet-200">
                <h1 className="text-3xl sm:text-4xl font-bold text-violet-700 text-center mb-4">
                    🌞 Cocomelon&apos;s Summer Camp Registration
                </h1>

                {submitted ? (
                    <p className="text-center text-green-600 text-lg font-semibold">
                        ✅ Registration submitted! Redirecting to payment...
                    </p>
                ) : (
                    <>
                        <p className="text-gray-800 text-sm sm:text-base mb-6 text-center leading-relaxed">
                            The camp runs from <strong>May 1st to May 31st</strong>, 5 days a week.
                            <br />
                            📍 51-8, 57/2, 60 Feet Road, Nakkavanipalem, Visakhapatnam, AP <br />
                            ☎ +91 6302164335 <br />
                            💳 Registration Fee: ₹250 | Total Fee: ₹2,000–₹2,500
                        </p>

                        {errorMessage && (
                            <div className="text-red-500 mb-4">{errorMessage}</div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {[ 
                                { name: "parentName", label: "Parent Name", required: true },
                                { name: "childName", label: "Child Name", required: true },
                                { name: "age", label: "Child Age", required: true },
                                { name: "contact", label: "Contact Number", required: true, type: "tel", pattern: "[0-9]{10}", title: "Enter 10-digit mobile number" },
                                { name: "email", label: "Email (optional)", required: false, type: "email" },
                                { name: "school", label: "School (optional)", required: false }
                            ].map((field) => (
                                <div key={field.name}>
                                    <label htmlFor={field.name} className="block text-sm font-medium text-violet-700 mb-1">
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type || "text"}
                                        name={field.name}
                                        id={field.name}
                                        value={form[field.name as keyof FormData]}
                                        onChange={handleChange}
                                        required={field.required}
                                        pattern={field.pattern}
                                        title={field.title}
                                        placeholder={field.label}
                                        className="w-full px-4 py-2 border border-violet-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 transition placeholder:text-violet-100 text-gray-800"
                                    />
                                </div>
                            ))}

                            <div className="pt-4">
                                <h2 className="text-md font-semibold text-violet-800 mb-2">
                                    💳 UPI Payment Details
                                </h2>
                                <p className="text-sm text-gray-700 mb-2">
                                    You&apos;ll be redirected to UPI app after submitting this form.
                                </p>
                                <p className="text-gray-700 font-semibold mb-2">
                                    UPI ID:{" "}
                                    <code className="bg-gray-100 px-2 py-1 rounded">
                                        yandapallisravankumar@oksbi
                                    </code>
                                </p>

                                {/* Dynamically generate QR Code */}
                                <QRCodeCanvas 
                                    value="upi://pay?pa=yandapallisravankumar@oksbi&pn=Cocomelon%20Camp&am=250&cu=INR" 
                                    size={180} 
                                    className="mb-4 rounded border border-violet-200"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-violet-600 text-white font-semibold px-4 py-3 rounded-md hover:bg-violet-700 transition"
                            >
                                {loading ? "Submitting..." : "Submit & Pay ₹250"}
                            </button>
                        </form>

                        <p className="text-center text-sm text-red-600 mt-4 font-medium">
                            🎟 Hurry! Limited seats available.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default SummerCampPage;
