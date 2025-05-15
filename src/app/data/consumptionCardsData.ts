
import {
  FaBolt,
  FaCalendarWeek,
  FaCalendarAlt,
  FaCalendar,
} from "react-icons/fa";

export const cunsumptionCardsData =[
    {
        period:"Today",
        icon: FaBolt,
        value:"4,618",
        unit:"kWh",
        updated:"Updated 1 hour ago",
        direction:"Up",
        percentage:"2.4%",
        iconcolor:"text-blue-500"
    },
    {
        period:"This Week",
        icon:FaCalendarWeek,
        value:"26,325",
        unit:"kWh",
        updated:"Updated day ago",
        direction:"Down",
        percentage:"1.1%",
        iconcolor:"text-green-500"
    },
    {
        period:"This Month",
        icon:FaCalendarAlt,
        value:"132,462",
        unit:"kWh",
        updated:"Updated 1 week ago",
        direction:"Up",
        percentage:"3.7%",
        iconcolor:"text-indigo-500"
    },
    {
        period:"This Year",
        icon:FaCalendar,
        value:"969,651",
        unit:"kWh",
        updated:"Updated 1 month ago",
        direction:"Down",
        percentage:"0.8%",
        iconcolor:"text-red-500"
    }
]