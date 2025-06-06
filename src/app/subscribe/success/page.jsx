export default function SubscribeSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-4">🎉 Subscription Successful!</h1>
      <p className="text-center text-gray-400 mb-6">
        Thank you for subscribing! You can now upload your own songs.
      </p>
      <a
        href="/workspace"
        className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 transition"
      >
        Go to My Workspace
      </a>
    </div>
  );
}
