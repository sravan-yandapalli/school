"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Blogs = () => {
  const [videos, setVideos] = useState<File[]>([]);
  const router = useRouter();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setVideos([...videos, ...Array.from(event.target.files)]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-[#37474f] mb-6">Blogs</h1>
      
      {/* Upload Video Button */}
      <label className="cursor-pointer bg-[#7357a4] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#5c4486]">
        Upload Video
        <input type="file" accept="video/*" multiple hidden onChange={handleFileUpload} />
      </label>
      
      {/* Video Gallery */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {videos.map((video, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
            <video controls className="w-full h-48 object-cover">
              <source src={URL.createObjectURL(video)} type={video.type} />
            </video>
            <p className="text-center mt-2 text-[#37474f] font-medium">{video.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
