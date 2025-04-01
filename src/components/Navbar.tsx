"use client";

import { Laptop, List, Menu, Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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

        {/* Menu */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-16 mt-2 border dark:border-white">
            <DropdownMenuItem className="w-full" asChild>
              <Button variant="outline" asChild>
                <Link href="/practice" className="w-full">
                  Practice
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Theme</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="mr-1" /> Dark
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="mr-1" /> Light
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setTheme("system")}
                    >
                      <Laptop className="mr-1" /> System
                    </Button>
                  </div>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Buttons */}

        {/* <div className="flex items-center space-x-4">
          <Link href="/practice" className="flex items-center">
            <span className="font-mono inline bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text drop-shadow-lg">
              Practice
            </span>
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
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
