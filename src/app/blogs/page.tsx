"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaPlayCircle } from "react-icons/fa";
import Image from "next/image";

const videos = [
  { id: 1, title: "Holi Celebration", src: "/videos/event1.mp4", thumbnail: "/thumbnails/event1.jpeg" },
  { id: 2, title: "Craft Time", src: "/videos/event2.mp4", thumbnail: "/thumbnails/event2.jpeg" },
  { id: 3, title: "Har Har Mahadev", src: "/videos/event3.mp4", thumbnail: "/thumbnails/event3.jpeg" },
  { id: 4, title: "Blue Day", src: "/videos/event4.mp4", thumbnail: "/thumbnails/event4.jpeg" },
];

const BlogsShowcase = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-center drop-shadow-lg">🎥 School Memories</h1>
      <p className="text-lg text-white/90 mb-6 text-center">Relive the best moments of our little stars! 🌟</p>
      
      {/* Back Button */}
      <button 
        onClick={() => router.back()} 
        className="mb-6 px-4 py-2 bg-white text-black rounded-full font-semibold shadow-md hover:bg-gray-200 transition"
      >
        ⬅ Back
      </button>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {videos.map((video) => (
          <div key={video.id} className="group bg-white text-black rounded-2xl shadow-xl overflow-hidden transition transform hover:scale-105">
            <div className="relative w-full h-56">
              {/* Video Thumbnail */}
              <Image src={video.thumbnail} alt={video.title} width={400} height={225} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <FaPlayCircle className="text-white text-6xl" />
              </div>
            </div>

            <div className="p-4">
              <h2 className="text-xl font-bold text-center">{video.title}</h2>
            </div>

            {/* Video Player on Hover */}
            <div className="hidden group-hover:block absolute top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center">
              <video controls className="w-11/12 h-auto rounded-lg shadow-lg">
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsShowcase;
