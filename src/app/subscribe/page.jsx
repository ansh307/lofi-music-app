"use client";

import { useState } from "react";
import { toast } from "sonner";
import Loader from "@/components/ui/Loader";

export default function SubscribePage() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      toast.error("Something went wrong!", {
        description:
          "Please try again or contact support if the issue persists.",
        className: "text-red-500",
        duration: 3000,
        action: {
          label: "Retry",
          onClick: handleSubscribe,
        },
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Subscribe to Upload Songs</h1>
      <p className="mb-6 text-center text-gray-400">
        ₹99 for the first month, then ₹199/month. Cancel anytime.
      </p>

      <button
        disabled={loading}
        onClick={handleSubscribe}
        className={`px-6 py-3 rounded-md transition flex items-center gap-2 ${
          loading
            ? "bg-gray-700 cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-200"
        }`}
      >
        {loading ? (
          <>
            <Loader size="sm" />
            <span>Redirecting...</span>
          </>
        ) : (
          "Subscribe Now"
        )}
      </button>
    </div>
  );
}
