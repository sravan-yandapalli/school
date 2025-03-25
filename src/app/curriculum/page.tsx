"use client";

import React, { useState, useEffect } from "react";

const dailyCurriculum = [
  { day: "Monday", activities: ["✔️ Storytelling", "📖 Alphabet Learning", "🎨 Creative Art"] },
  { day: "Tuesday", activities: ["🔢 Numbers & Counting", "🎶 Music & Dance", "🏃 Outdoor Play"] },
  { day: "Wednesday", activities: ["🧪 Science Experiments", "✍️ Handwriting Practice", "🧩 Puzzle Solving"] },
  { day: "Thursday", activities: ["🎲 Group Games", "📜 Poetry Reading", "🖌️ Clay Modeling"] },
  { day: "Friday", activities: ["🎭 Role Play", "🌿 Nature Walk", "🎨 Color Recognition"] },
  { day: "Saturday", activities: ["✂️ Crafts & DIY", "🎤 Sing-Along Songs", "🤝 Team Activities"] },
  { day: "Sunday", activities: ["😌 Rest & Reflection", "👨‍👩‍👧‍👦 Family Time", "📚 Light Reading"] },
];

const Curriculum = () => {
  const [todayCurriculum, setTodayCurriculum] = useState<{ day: string; activities: string[] } | null>(null);

  useEffect(() => {
    const currentDayIndex = new Date().getDay();
    setTodayCurriculum(dailyCurriculum[currentDayIndex]);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-[#37474f] mb-6">Curriculum Overview</h1>

      {/* Today's Curriculum */}
      {todayCurriculum && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mb-8">
          <h2 className="text-2xl font-semibold text-[#7357a4] text-center">
            Today's Curriculum - {todayCurriculum.day}
          </h2>
          <ul className="mt-4 list-disc list-inside text-lg text-gray-900">
            {todayCurriculum.activities.map((activity, index) => (
              <li key={index} className="flex items-center gap-2">{activity}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Full Weekly Curriculum */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">Weekly Curriculum</h2>
        {dailyCurriculum.map((daySchedule, index) => (
          <div key={index} className="mt-6">
            <h3 className="text-xl font-semibold text-gray-900">{daySchedule.day}</h3>
            <ul className="mt-2 list-disc list-inside text-lg text-gray-800">
              {daySchedule.activities.map((activity, i) => (
                <li key={i} className="flex items-center gap-2">{activity}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Curriculum;
