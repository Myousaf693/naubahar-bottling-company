"use client";

import { sidebarLinks } from "@/app/data/sidebarLinks";
import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Image from "next/image";
import { useTheme } from "next-themes";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {theme} = useTheme();
  const pathName = usePathname();
  const width = isCollapsed ? "w-12" : "w-64";

  return (
    <aside
      className={`bg-white flex flex-col justify-between dark:bg-gray-500 h-[47rem] ml-4 mt-4 border-2 border-t-6 rounded-md border-t-[#1F5897] border-gray-400 p-1 transition-all duration-300 ${width} overflow-auto custom-scroll`}
    >
      <div>
      <div className={`flex items-center px-2 ${isCollapsed ? 'justify-center':'justify-between'}`}>
            {!isCollapsed && <span className="text-sm font-[13px]">Home Section</span>}
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="text-white text-xl bg-[#1F5897] rounded-full p-[5px] text-center"
          >
            {isCollapsed ? <FiMenu />: <RxCross2 />}
          </button>
      </div>
      <hr className="bg-gray-700 dark:bg-white mt-2 w-[100%]"/>
      <nav className="flex flex-col mt-4">
        {sidebarLinks.map(link=>{
          const isActive = pathName === link.href || (pathName.startsWith(link.href)); 
          return(
            <Accordion key={link.id} type="single" collapsible className="w-full py-2">
          <AccordionItem value={link.name}>
            <AccordionTrigger className={` hover:bg-gray-300 dark:text-white dark:hover:bg-gray-400 text-gray-800 p-2 flex justify-between ${isCollapsed && '[&>svg]:hidden'} `}>
                <div className={`flex gap-2 items-center text=center ${isCollapsed ? 'justify-center':'justify-start'}`}>
                <link.icon size={20}/>
                {!isCollapsed && link.name}
                </div>
            </AccordionTrigger>
            {link.subLinks?.map((subLink)=>(
                <Link key={subLink.name} href={subLink.link}>
            <AccordionContent className={`ml-2 flex items-center justify-start gap-2 mt-2 p-1 rounded-sm hover:border-b-2 border-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-400 ${ isActive && 'bg-gray-300 dark:bg-gray-400 dark:text-white dark:hover:bg-gray-400'}`}>
              <subLink.icon />
              {!isCollapsed && subLink.name}
            </AccordionContent>
                </Link>
            ))}
          </AccordionItem>
        </Accordion>
        )})}
        
      </nav>
      </div>
      <div className="w-full flex justify-center items-center">
        {!isCollapsed && 
        <Link href={'/'}>
          {theme === 'dark' ? (
            <Image src={'/icon.png'} width={150} height={150} alt="Logo Image"/>
          ):(
            <Image src={'/light-icon.png'} width={150} height={150} alt="Logo Image"/>
          )}
        </Link>
        }
      </div>
    </aside>
  );
};

export default Sidebar;