import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
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

        <div className="flex items-center space-x-4">
          <Link href="https://linkedin.com/in/nihalgupta0">
            <Linkedin className="transition-colors duration-300 hover:text-blue-500" />
          </Link>
          <Link
            href="https://github.com/behalnihal"
            className="flex items-center"
          >
            <span>
              <Github className="transition-colors duration-300 hover:text-blue-500" />
            </span>
          </Link>
          <Link
            href="https://x.com/behalnihal"
            target="_blank"
            className="flex items-center"
          >
            <BsTwitterX
              size={20}
              className="transition-colors duration-300 hover:text-blue-500"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
