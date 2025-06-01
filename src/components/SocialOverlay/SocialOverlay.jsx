import { useTheme } from "@/context/ThemeContext";
import themes from "@/lib/themes";
import { FiShare2 } from "react-icons/fi";

const SocialOverlay = () => {
  const linktreeUrl = "https://linktr.ee/anshsoni55333"; // replace with your actual linktree

  const handleRedirect = () => {
    window.open(linktreeUrl, "_blank");
  };

  
  const { theme } = useTheme();

  const themeClass = themes[theme] || themes["indigo"]; // fallback

  return (
    <div className="fixed top-[6rem] right-12 z-50">
      <button
        onClick={handleRedirect}
        className={` ${themeClass.icon} ${themeClass.hover} text-2xl transition`}
        title="Socials"
      >
        <FiShare2 className={`${themeClass.dropShadow}`}/>
      </button>
    </div>
  );
};

export default SocialOverlay;
