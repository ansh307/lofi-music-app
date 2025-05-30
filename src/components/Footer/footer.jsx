import React from "react";
import { connectionLinks } from "../SocialLinks/SocialLinks";
import SocialLinksComponent from "../SocialLinks/SocialLinksComponent";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-black relative z-10"> 
      <footer className="px-4 sm:px-8 lg:px-20  border-gray-200 shadow-md text-gray py-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Left Content */}
          <div className="flex items-center space-x-4">
            <Link className="text-sm flex group" href={"/"}>
              <p className="text-slate-400 group-hover:text-indigo-200 transition duration-300">
                &copy; 2025{" "}
                <span className="text-slate-400 group-hover:text-indigo-200 transition duration-300">
                  LofiDa
                </span>{" "}
              </p>
            </Link>

            <p className="text-sm text-gray-800">
              Created by Ansh
            </p>
          </div>

          {/* Right Content - Social Links */}
          <div className="flex space-x-4">
            {connectionLinks.map((item) => (
              <SocialLinksComponent
                key={item.name}
                name={item.name}
                link={item.link}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
