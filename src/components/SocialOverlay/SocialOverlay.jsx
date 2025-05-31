import { FiShare2 } from "react-icons/fi";

const SocialOverlay = () => {
  const linktreeUrl = "https://linktr.ee/anshsoni55333"; // replace with your actual linktree

  const handleRedirect = () => {
    window.open(linktreeUrl, "_blank");
  };

  return (
    <div className="fixed top-[6rem] right-12 z-50">
      <button
        onClick={handleRedirect}
        className="text-indigo-300 hover:text-indigo-100 text-2xl transition"
        title="Socials"
      >
        <FiShare2 />
      </button>
    </div>
  );
};

export default SocialOverlay;
