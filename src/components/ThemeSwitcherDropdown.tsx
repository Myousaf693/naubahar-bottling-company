'use client'
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { HiOutlineSwitchVertical } from "react-icons/hi"

const ThemeSwitcherDropdown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMOunted] = useState(false)

    const {systemTheme, theme, setTheme} = useTheme();

    const currentTheme = theme === "system" ? systemTheme : theme;

    useEffect(()=>{
        setMOunted(true)
    },[]);
    if(!mounted) return null;
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger>
            {currentTheme === 'dark' ? (
                <Moon className="text-indigo-500"/>
            ):(
                <Sun className="text-yellow-500"/>
            )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={10} className="text-base list-none bg-white divide-y divide-gray-100 dark:bg-gray-700 dark-divi-gray-600">
            <ul className="py-1 font-light text-gray-500 dark:text-gray-400">
                <li onClick={()=>{
                    setTheme('dark')
                    setIsOpen(false)
                }} className="flex item-center cursor-pointer py-2 px-2 text-center text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
                    <Moon className="text-indigo-500" size={19}/>
                    <span className="ml-2 font-medium text-md">Dark</span>
                </li>
                <li onClick={()=>{
                    setTheme('light')
                    setIsOpen(false)
                }} className="flex item-center cursor-pointer py-2 px-2 text-center text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
                    <Sun className="text-yellow-500" size={19}/>
                    <span className="ml-2 font-medium text-md">Light</span>
                </li>
                <li onClick={()=>{
                    setTheme('system')
                    setIsOpen(false)
                }} className="flex item-center cursor-pointer py-2 px-2 text-center text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
                    <HiOutlineSwitchVertical size={19}/>
                    <span className="ml-2 font-medium text-md">System</span>
                </li>
            </ul>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeSwitcherDropdown
