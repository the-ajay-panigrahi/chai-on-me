"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with your public key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PaymentForm({ username }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSupport = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !message || !amount) {
      alert("Please fill all mandatory fields.");
      setLoading(false);
      return;
    }

    try {
      // Call your backend to create a checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, name, message, username }),
      });
      const { sessionId } = await response.json();

      if (!sessionId) {
        throw new Error("Could not create session");
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  const setPresetAmount = (presetAmount) => {
    setAmount(presetAmount);
  };

  return (
    <div className="bg-white/70 p-6 rounded-lg shadow-md backdrop-blur-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Make a Payment
      </h2>
      <form onSubmit={handleSupport} className="space-y-4">
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name*"
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter Message*"
          rows="3"
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        ></textarea>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            $
          </span>
          <input
            required
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount*"
            className="w-full pl-7 pr-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPresetAmount("10")}
            className="flex-1 text-pink-600 bg-pink-100 hover:bg-pink-200 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors"
          >
            Pay $10
          </button>
          <button
            type="button"
            onClick={() => setPresetAmount("20")}
            className="flex-1 text-pink-600 bg-pink-100 hover:bg-pink-200 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors"
          >
            Pay $20
          </button>
          <button
            type="button"
            onClick={() => setPresetAmount("30")}
            className="flex-1 text-pink-600 bg-pink-100 hover:bg-pink-200 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors"
          >
            Pay $30
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
        >
          {loading ? "Processing..." : `Support with $${amount || "0"}`}
        </button>
      </form>
    </div>
  );
}
