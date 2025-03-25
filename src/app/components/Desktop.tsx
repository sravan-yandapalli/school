"use client";

import React, { JSX, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Desktop = (): JSX.Element => {
    const router = useRouter();
    const [showMore, setShowMore] = useState(false); // Toggle State

    return (
        <div className="bg-white flex justify-center items-center w-full min-h-screen">
            <div className="bg-[#7357a4] w-full max-w-[1440px] px-6 sm:px-10 lg:px-20 py-10 relative rounded-lg">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    {/* Logo & Title */}
                    <div className="flex items-center gap-4">
                        <Image src="/logo1.png" alt="Logo" width={70} height={70} />
                        <div>
                            <h1 className="text-white text-3xl sm:text-5xl font-bold tracking-wide">Cocomelon</h1>
                            <p className="text-white text-sm sm:text-lg tracking-wide">Pre School & Day Care</p>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-4 mt-4 sm:mt-0 flex-wrap sm:flex-nowrap">
                        {/* Main Buttons */}
                        <button
                            onClick={() => router.push("/admission")}
                            className="bg-white flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 rounded-lg shadow-md hover:bg-gray-200 transition-all"
                        >
                            <Image src="/contract1.png" alt="Admission" width={20} height={20} />
                            <span className="text-[#37474f] text-sm sm:text-lg font-semibold">Admission</span>
                        </button>

                        <button
                            onClick={() => router.push("/blogs")}
                            className="bg-white flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 rounded-lg shadow-md hover:bg-gray-200 transition-all"
                        >
                            <Image src="/father1.png" alt="Blogs" width={22} height={22} />
                            <span className="text-[#37474f] text-sm sm:text-lg font-semibold">Blogs</span>
                        </button>

                        {/* Extra Buttons - Always Show on Desktop */}
                        <div className="hidden sm:flex items-center gap-4">
                            <button
                                onClick={() => router.push("/curriculum")}
                                className="bg-white flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 rounded-lg shadow-md hover:bg-gray-200 transition-all"
                            >
                                <Image src="/program.png" alt="Curriculum" width={20} height={20} />
                                <span className="text-[#37474f] text-sm sm:text-lg font-semibold">Curriculum</span>
                            </button>

                            <button
                                onClick={() => router.push("/online-fee")}
                                className="bg-white flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 rounded-lg shadow-md hover:bg-gray-200 transition-all"
                            >
                                <Image src="/payment.png" alt="Online Fee" width={20} height={20} />
                                <span className="text-[#37474f] text-sm sm:text-lg font-semibold">Online Fee</span>
                            </button>
                        </div>

                        {/* Hamburger Menu - Mobile Only */}
                        <button
                            className="sm:hidden bg-gray-700 p-2 rounded-lg shadow-md hover:bg-gray-600 transition-all"
                            onClick={() => setShowMore(!showMore)}
                        >
                            <span className="text-2xl text-white">☰</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Extra Buttons - Toggleable */}
                <div className={`mt-4 flex gap-4 flex-wrap ${showMore ? "flex" : "hidden sm:hidden"}`}>
                    <button
                        onClick={() => router.push("/curriculum")}
                        className="bg-white flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 rounded-lg shadow-md hover:bg-gray-200 transition-all"
                    >
                        <Image src="/program.png" alt="Curriculum" width={20} height={20} />
                        <span className="text-[#37474f] text-sm sm:text-lg font-semibold">Curriculum</span>
                    </button>

                    <button
                        onClick={() => router.push("/online-fee")}
                        className="bg-white flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 rounded-lg shadow-md hover:bg-gray-200 transition-all"
                    >
                        <Image src="/payment.png" alt="Online Fee" width={20} height={20} />
                        <span className="text-[#37474f] text-sm sm:text-lg font-semibold">Online Fee</span>
                    </button>
                </div>

                {/* About Us Section */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12 mt-10">
                    <div className="bg-white rounded-[30px] p-6 sm:p-10 lg:p-14 shadow-lg w-full lg:w-[55%]">
                        <h2 className="text-[#37474f] text-4xl sm:text-6xl font-bold text-center lg:text-left">About Us</h2>
                        <p className="text-[#37474f] text-base sm:text-xl font-medium tracking-wide leading-relaxed mt-4 text-center lg:text-left">
                            At Cocomelon Pre-School & Day Care, we create a safe, joyful, and nurturing environment where
                            children explore, learn, and grow. Our unique teaching methods focus on fun-filled education,
                            helping children build a strong foundation for their future.
                        </p>
                    </div>

                    {/* Image Collage */}
                    <div className="grid grid-cols-2 gap-4 w-full lg:w-[40%]">
                        <Image src="/i4.png" alt="i4" width={160} height={250} className="rounded-lg shadow-md w-full" />
                        <Image src="/i3.png" alt="i3" width={180} height={300} className="rounded-lg shadow-md w-full" />
                        <Image src="/i2.png" alt="i2" width={160} height={250} className="rounded-lg shadow-md w-full" />
                        <Image src="/i1.png" alt="i1" width={180} height={200} className="rounded-lg shadow-md w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};
