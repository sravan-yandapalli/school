"use client";

import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function Desktop() {
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [upiUrl, setUpiUrl] = useState<string>("");

  useEffect(() => {
    const upiID = "yandapallisravankumar@oksbi";
    const amount = 250;
    setUpiUrl(`upi://pay?pa=${upiID}&pn=SummerCamp&am=${amount}&cu=INR`);
  }, []);

  const schoolsInVizag = [
    "Cocomelon Pre School and Day Care",
    "Delhi Public School",
    "Sri Prakash Vidyaniketan",
    "Timpany School",
    "SFS School CBSE",
    "SFS School State Board",
    "Oakridge International School",
    "Narayana School",
    "Narayana E-Techno School",
    "Sri Chaitanya Techno School",
    "Bhashyam School",
    "Bethany School",
    "Siva Sivani Public School",
    "Little Angels School",
    "Greendale International School",
    "Others",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/register-summer-camp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentName,
          childName,
          age: childAge,
          contact: phoneNumber,
          email,
          school,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText("yandapallisravankumar@oksbi");
    alert("UPI ID copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 p-4">
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6"
        >
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
            Summer Camp Registration
          </h1>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Parent's Full Name"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              required
              className="w-full text-black p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Child's Full Name"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              required
              className="w-full text-black p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Child's Age"
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              required
              className="w-full text-black p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="tel"
              placeholder="Parent's Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full text-black p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Email Address (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-black p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              required
              className="w-full text-black p-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                Select School
              </option>
              {schoolsInVizag.map((schoolName) => (
                <option key={schoolName} value={schoolName}>
                  {schoolName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit & Proceed"}
          </button>
        </form>
      ) : (
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6 text-center">
          <h2 className="text-2xl font-bold text-green-600">Registration Successful! 🎉</h2>
          <p className="text-gray-600">
            Please complete your payment of <strong>₹250</strong> to confirm your spot.
          </p>

          <div className="flex flex-col items-center space-y-4">
            <QRCodeCanvas value={upiUrl} size={200} />
            <p className="text-gray-800 font-medium">Scan this QR with any UPI app</p>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <span className="font-semibold text-gray-700">yandapallisravankumar@oksbi</span>
            <button
              onClick={handleCopyUPI}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-1 px-3 rounded-full transition-all"
            >
              Copy
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            You can also manually use the UPI ID in apps like PhonePe, Google Pay, Paytm etc.
          </p>
        </div>
      )}
    </div>
  );
}
