import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { AlertTriangle, Bell } from "lucide-react";
import { alarms } from "@/app/data/notifications";

const NotificationDropdown = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Bell className="text-white cursor-pointer" size={21} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className=" max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border bg-white p-4"
          sideOffset={10}
        >
          <DropdownMenuLabel>
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-lg font-semibold">Alarms</h2>
              <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                New
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="space-y-3">
            {alarms.map((alarm, idx) => (
              <DropdownMenuItem>
                <div
                  key={idx}
                  className="w-full flex items-start justify-between pb-2"
                >
                  <div className="flex items-start gap-2">
                    <Bell className="text-yellow-400 w-5 h-5 mt-1" />
                    <div>
                      <p className="font-medium text-gray-800">{alarm.title}</p>
                      <p className="text-sm text-gray-500">{alarm.desc}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{alarm.time}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center justify-center">
            <span>Details</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NotificationDropdown;
