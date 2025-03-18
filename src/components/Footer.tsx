import React from "react";
import { BsSuitHeartFill, BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="py-4">
      <div className="container mx-auto flex flex-row items-center justify-between px-4">
        {/* Author  */}
        <div className="flex items-center space-x-2">
          <span className="flex items-center">
            Made with <BsSuitHeartFill className="ml-1 mr-1" /> by Nihal
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
