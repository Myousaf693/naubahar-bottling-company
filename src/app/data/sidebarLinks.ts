import { FiHome, FiUser, FiSettings, FiUserPlus } from "react-icons/fi";
import { IconType } from "react-icons";
import { PiPlantLight } from "react-icons/pi";
import { CiViewTable } from "react-icons/ci";
import { IoMdAlarm } from "react-icons/io";
import { MdOutlinePower, MdPublishedWithChanges  } from "react-icons/md";
import { RiHistoryFill } from "react-icons/ri";




export interface SubLinkType {
  name: string;
  link: string;
  icon: IconType;
}
export interface SidebarLinkType {
  id:number;
  name: string;
  href: string;
  icon: IconType;
  subLinks?: SubLinkType[];
}

export const sidebarLinks: SidebarLinkType[] = [
  {
    id:1,
    name: "Unit 1",
    href: "/",
    icon: FiHome,
    subLinks: [
      {
        name: "Plant Summary",
        link: "plant-summary",
        icon: PiPlantLight,
      },
      {
        name: "Status Table",
        link: "status-table",
        icon: CiViewTable,
      },
    ],
  },
  {
    id:2,
    name: "Alarms",
    href: "/alarms",
    icon: IoMdAlarm,
    subLinks: [
      {
        name: "Current Status",
        link: "current-status",
        icon: MdOutlinePower,
      },
      {
        name: "Events",
        link: "events",
        icon: MdPublishedWithChanges ,
      },
      {
        name: "Log History",
        link: "alarm-history",
        icon: RiHistoryFill ,
      },
      {
        name: "Alarm Listner",
        link: "status-table",
        icon: RiHistoryFill ,
      },
    ],
  },
  
];
