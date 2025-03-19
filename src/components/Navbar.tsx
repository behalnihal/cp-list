"use client";
import { Coffee, Github, List, Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import { BsTwitterX } from "react-icons/bs";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* Logo */}
        <div className="font-bold text-2xl flex-1">
          <Link href="/" className="flex items-center">
            <span className="mr-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
              <List size={24} />
            </span>
            <span className="inline bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text drop-shadow-lg">
              CP List
            </span>
          </Link>
        </div>

        {/* Practice  */}

        <div className="font-bold text-2xl flex-1">
          <Link href="/practice" className="flex items-center">
            <span className="font-mono inline bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text drop-shadow-lg">
              Practice
            </span>
          </Link>
        </div>

        {/* Buttons */}

        <div className="flex items-center space-x-4">
          <Link
            href="https://buymeacoffee.com/nihal_gupta"
            className="flex items-center"
          >
            <span>
              <Coffee className="transition-colors duration-300 hover:text-blue-500" />
            </span>
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
          <button
            className="cursor-pointer"
            onClick={() =>
              theme === "light" ? setTheme("dark") : setTheme("light")
            }
          >
            {theme === "light" ? (
              <Sun className="transition-colors duration-300 hover:text-blue-500" />
            ) : (
              <Moon className="transition-colors duration-300 hover:text-blue-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
