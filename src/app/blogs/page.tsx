"use client";

import React, { useState } from "react";
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
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const handlePlayVideo = (id: number) => {
    console.log("Playing video ID:", id);
    setPlayingVideo(id);
  };

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
          <div
            key={video.id}
            className="bg-white text-black rounded-2xl shadow-xl overflow-hidden transition transform hover:scale-105 relative"
          >
            {playingVideo === video.id ? (
              <video
                controls
                autoPlay
                className="w-full h-56 object-cover"
                onEnded={() => setPlayingVideo(null)}
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div
                className="relative w-full h-56 cursor-pointer"
                onClick={() => handlePlayVideo(video.id)}
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-80">
                  <FaPlayCircle className="text-white text-6xl" />
                </div>
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold text-center">{video.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsShowcase;
