export default function SubscribeCancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Subscription Cancelled</h1>
      <p className="text-center text-gray-400 mb-6">
        You cancelled the checkout process. No worries — you can subscribe
        anytime.
      </p>
      <a
        href="/subscribe"
        className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 transition"
      >
        Try Again
      </a>
    </div>
  );
}
