"use client"; // Required for state management in Next.js App Router

import React, { useState } from "react";
import Image from "next/image";

const Blogs = () => {
    const [blogPosts, setBlogPosts] = useState<{ 
        id: number;
        title: string;
        description: string;
        date: string;
        video: string; // Local video URL
    }[]>([]);

    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const videoUrl = URL.createObjectURL(file); // Create a temporary URL

        const newPost = {
            id: blogPosts.length + 1,
            title: `Uploaded Video ${blogPosts.length + 1}`,
            description: "This is a user-uploaded video blog.",
            date: new Date().toLocaleDateString(),
            video: videoUrl,
        };

        setBlogPosts([newPost, ...blogPosts]); // Add new video on top
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Upload & Watch Blogs</h1>

            {/* Video Upload Input */}
            <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-blue-700">
                Upload Video
                <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideoUpload}
                />
            </label>

            {/* Blog Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 w-full max-w-6xl">
                {blogPosts.map((post) => (
                    <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="relative w-full h-48">
                            <Image src="/v1.jpeg" alt="Video Thumbnail" layout="fill" objectFit="cover" />
                        </div>
                        <div className="p-5">
                            <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                            <p className="text-sm text-gray-500 mt-2">{post.date}</p>
                            <p className="text-gray-600 mt-3">{post.description}</p>

                            {/* Display Video */}
                            <video controls className="w-full h-48 mt-4 rounded-lg">
                                <source src={post.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
