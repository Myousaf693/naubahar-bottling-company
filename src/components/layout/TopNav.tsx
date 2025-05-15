import { Bell } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { AiOutlineDashboard } from 'react-icons/ai'
import { IoTrendingUpSharp } from 'react-icons/io5'
import { LiaProjectDiagramSolid } from 'react-icons/lia'
import { LuLayoutDashboard } from 'react-icons/lu'
import { TbReport } from 'react-icons/tb'

const TopNav = () => {
  return (
    <div className='bg-[#1F5897] w-full pl-5'>
      <nav>
        <ul className='flex gap-4 p-2'>
            <li className='flex items-center'>
                <Link href={'#'} className='flex items-center text-center text-white gap-1 focus:bg-white focus:text-gray-800 hover:bg-white hover:text-gray-800 p-1 rounded'>
                <AiOutlineDashboard size={20}/>
                <span className='text-sm font-semibold'>DASHBOARD</span>
                </Link>
            </li>
            <li className='flex items-center'>
                <Link href={'/'} className='flex items-center text-center text-white gap-1 focus:bg-white focus:text-gray-800 hover:bg-white hover:text-gray-800 p-1 rounded'>
                <LuLayoutDashboard size={20}/>
                <span className='text-sm font-semibold'>CUSTOM DASHBOARD</span>
                </Link>
            </li>
            <li className='flex items-center'>
                <Link href={'#'} className='flex items-center text-center text-white gap-1 focus:bg-white focus:text-gray-800 hover:bg-white hover:text-gray-800 p-1 rounded'>
                <LiaProjectDiagramSolid size={20}/>
                <span className='text-sm font-semibold'>DIAGRAM</span>
                </Link>
            </li>
            <li className='flex items-center'>
                <Link href={'#'} className='flex items-center text-center text-white gap-1 focus:bg-white focus:text-gray-800 hover:bg-white hover:text-gray-800 p-1 rounded'>
                <Bell size={20}/>
                <span className='text-sm font-semibold'>ALARM</span>
                </Link>
            </li>
            <li className='flex items-center'>
                <Link href={'#'} className='flex items-center text-center text-white gap-1 focus:bg-white focus:text-gray-800 hover:bg-white hover:text-gray-800 p-1 rounded'>
                <IoTrendingUpSharp size={20}/>
                <span className='text-sm font-semibold'>TRENDS</span>
                </Link>
            </li>
            <li className='flex items-center'>
                <Link href={'#'} className='flex items-center text-center text-white gap-1 focus:bg-white focus:text-gray-800 hover:bg-white hover:text-gray-800 p-1 rounded'>
                <TbReport size={20}/>
                <span className='text-sm font-semibold'>REPORTS</span>
                </Link>
            </li>
        </ul>
      </nav>
    </div>
  )
}

export default TopNav
