import { FiHome, FiUser, FiSettings, FiUserPlus } from "react-icons/fi";
import { IconType } from "react-icons";
import { PiPlantLight } from "react-icons/pi";
import { CiViewTable } from "react-icons/ci";

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
    name: "Profile",
    href: "/profile",
    icon: FiUser,
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
    id:3,
    name: "Settings",
    href: "/settings",
    icon: FiSettings,
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
    id:4,
    name: "Settings",
    href: "/settings",
    icon: FiSettings,
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
    id:5,
    name: "Settings",
    href: "/settings",
    icon: FiSettings,
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
];
