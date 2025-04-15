"use client";

import { Flame, Laptop, Menu, Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const { setTheme } = useTheme();
  return (
    <div className="border-b flex h-16 items-center px-4 container mx-auto">
      {/* Logo */}
      <div className="flex-1 font-bold text-2xl">
        <Link href="/" className="items-center">
          <span className=" mr-1">
            <Flame className="inline" size={24} color="#104e64" />
          </span>
          <span className="inline text-sky-800 drop-shadow-lg">CP List</span>
        </Link>
      </div>

      {/* Menu */}
      <div className="flex items-center space-x-4">
        <Link
          href="/practice"
          className="hover:text-blue-400 transition duration-300"
        >
          Practice
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-16 mt-2 border dark:border-white">
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
      </div>
    </div>
  );
};

export default Navbar;
