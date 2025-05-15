"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { RiLogoutCircleLine } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaRegUser } from "react-icons/fa";
import ThemeSwitcherDropdown from "../ThemeSwitcherDropdown";
import { useTheme } from "next-themes";
import NotificationDropdown from "../NotificationDropdown";

const Topbar = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div className="top-0 w-full flex items-center h-14 pb-3 justify-between bg-white dark:bg-gray-500 px-6">
      <Link href={"/"}>
        {theme === "dark" ? (
          <Image src={"/icon.png"} width={150} height={150} alt="Logo Image" />
        ) : (
          <Image
            src={"/light-icon.png"}
            width={150}
            height={150}
            alt="Logo Image"
            className="mt-3"
          />
        )}
      </Link>
      <div className="flex items-center justify-center pt-3 gap-3">
        <div>
          <ThemeSwitcherDropdown />
        </div>
        <Separator
          orientation="vertical"
          style={{ height: "20px" }}
          className="border dark:border-white border-black"
        />
        <div>
          <NotificationDropdown />
        </div>
        <Separator
          orientation="vertical"
          style={{ height: "20px" }}
          className="border dark:border-white border-black"
        />
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="/user.avif" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={10}>
              <DropdownMenuItem>
                <FaRegUser
                  className={`${
                    currentTheme === "dark" ? "text-white" : "text-black"
                  }`}
                  size={20}
                />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RiLogoutCircleLine
                  size={20}
                  className={`${
                    currentTheme === "dark" ? "text-white" : "text-black"
                  }`}
                />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
