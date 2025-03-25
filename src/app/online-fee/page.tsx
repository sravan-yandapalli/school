"use client";

import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const UPI_ID = "yandapallisravankumar@oksbi"; // Your UPI ID
const AMOUNT = "3000"; // Set the default amount

const OnlineFee = () => {
  const [paymentDone, setPaymentDone] = useState(false);

  // Generate UPI payment link
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=Your%20Name&am=${AMOUNT}&cu=INR`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-[#37474f] mb-6">Online Fee Payment</h1>

      {/* UPI QR Code */}
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-2">Scan & Pay</h2>
        <QRCodeCanvas value={upiLink} size={200} className="mx-auto mb-4" />
        <p className="text-sm text-gray-600">Scan the QR code or click the button below to pay.</p>
      </div>

      {/* Payment Link */}
      <a
        href={upiLink}
        className="bg-[#7357a4] text-white px-6 py-2 rounded-lg shadow-md mt-4 hover:bg-[#5c4486]"
        onClick={() => setPaymentDone(true)}
      >
        Pay ₹{AMOUNT} via UPI
      </a>

      {/* Payment Confirmation Message */}
      {paymentDone && (
        <div className="mt-4 bg-green-100 text-green-800 p-4 rounded-lg shadow-md">
          ✅ Payment Completed Successfully!
        </div>
      )}
    </div>
  );
};

export default OnlineFee;
