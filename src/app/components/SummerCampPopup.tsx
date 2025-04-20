"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SummerCampPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 1000); // Show after 1 second

        return () => clearTimeout(timer);
    }, []);

    if (!showPopup) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-2xl relative animate-fadeIn">
                <button
                    className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl"
                    onClick={() => setShowPopup(false)}
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold text-violet-700 mb-2 text-center">🌞 Summer Camp Alert!</h2>
                <p className="text-gray-800 text-base mb-4 text-center leading-relaxed">
                    Join the fun at Cocomelon&apos;s Summer Camp!<br />
                    <strong>Dates:</strong> May 1&aposs;t – May 31st<br />
                    <strong>Fee:</strong> ₹2,000<br />
                    Limited seats – register now!
                </p>
                <button
                    onClick={() => {
                        setShowPopup(false);
                        router.push("/summer-camp");
                    }}
                    className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-4 py-2 rounded-lg w-full"
                >
                    Register Now
                </button>
            </div>
        </div>
    );
};

export default SummerCampPopup;
