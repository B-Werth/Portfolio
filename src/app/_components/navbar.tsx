import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 h-[65px] w-full bg-[#03001417] px-10 shadow-lg shadow-[#2A0E61]/50 backdrop-blur-md">
      <div className="m-auto flex h-full w-full flex-row items-center justify-between px-[10px]">
        <a
          href="#about-me"
          className="flex h-auto w-auto flex-row items-center"
        >
          <span className="ml-[10px] hidden font-bold text-gray-300 md:block">
            Bastian Werth
          </span>
        </a>

        <div className="flex h-full w-[500px] flex-row items-center justify-between md:mr-20">
          <div className="mr-[15px] flex h-auto w-full items-center justify-between rounded-full border border-[#7042f861] bg-[#0300145e] px-[20px] py-[10px] text-gray-200">
            <a href="#about-me" className="cursor-pointer">
              About me
            </a>
            <a href="#skills" className="cursor-pointer">
              Skills
            </a>
            <a href="#projects" className="cursor-pointer">
              Projects
            </a>
          </div>
        </div>

        <div className="flex flex-row gap-5"></div>
      </div>
    </div>
  );
};

export default Navbar;
