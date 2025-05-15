"use client"
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
    <div className="top-0 w-full flex items-center h-14 pb-3 justify-between bg-gray-500 px-6">
      <Link href={"/"}>
        <Image src="/icon.png" alt="Naubahar Logo" width={150} height={150} />
      </Link>
      <div className="flex items-center justify-center pt-3 gap-3">
        <div>
          <ThemeSwitcherDropdown/>
        </div>
        <Separator
          orientation="vertical"
          style={{ height: "20px" }}
          className="border border-white"
        />
        <div>
          <NotificationDropdown/>
        </div>
        <Separator
          orientation="vertical"
          style={{ height: "20px" }}
          className="border border-white"
        />
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={10}>
              <DropdownMenuItem>
                <FaRegUser color="black" size={20}/>
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RiLogoutCircleLine color="black" size={20}/>
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
