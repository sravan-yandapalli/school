"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";

const UPI_ID = "yandapallisravankumar@oksbi"; // Your UPI ID

const OnlineFee = () => {
  const [amount, setAmount] = useState("3000"); // Default amount
  const [paymentDone, setPaymentDone] = useState(false);
  const router = useRouter();

  // Generate UPI payment link dynamically
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=Your%20Name&am=${amount}&cu=INR`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-[#37474f] mb-6">Online Fee Payment</h1>

      {/* UPI QR Code */}
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-md">
        <h2 className="text-xl text-gray-400 font-semibold mb-2">Scan & Pay</h2>
        <QRCodeCanvas value={upiLink} size={200} className="mx-auto mb-4" />
        <p className="text-sm text-gray-600">Scan the QR code or click the button below to pay.</p>

        {/* Amount Input Field */}
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full text-center rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-[#7357a4]"
        />
      </div>

      {/* Payment Link */}
      <a
        href={upiLink}
        className="bg-[#7357a4] text-white px-6 py-2 rounded-lg shadow-md mt-4 hover:bg-[#5c4486] transition-all"
        onClick={() => setPaymentDone(true)}
      >
        Pay ₹{amount} via UPI
      </a>

      {/* Payment Confirmation Message */}
      {paymentDone && (
        <div className="mt-4 bg-green-100 text-green-800 p-4 rounded-lg shadow-md">
          ✅ Payment Completed Successfully!
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mt-6 bg-gray-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700 transition-all"
      >
        Back
      </button>
    </div>
  );
};

export default OnlineFee;
