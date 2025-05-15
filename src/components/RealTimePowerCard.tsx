import Image from "next/image";
import React from "react";
import { EnergyDetailType } from "@/lib/interfaces/types";

// Component Props
type RealTimePowerCardProps = EnergyDetailType;

const RealTimePowerCard: React.FC<RealTimePowerCardProps> = ({
  name,
  voltageValue,
  voltageUnit,
  currentValue,
  currentUnit,
  powerValue,
  powerUnit,
  icon:Icon
}) => {
    const getStatus = (voltage: number, current: number, power: number) => {
  if (voltage > 0 && current > 0 && power > 0) {
    return {
      image: "/green_bl.gif",
      color: "text-green-500",
    };
  } else if (voltage > 0 || current > 0 || power > 0) {
    return {
      image: "/yell_bl.gif",
      color: "text-yellow-500",
    };
  } else {
    return {
      image: "/red_bl.gif",
      color: "text-red-500",
    };
  }
};
const status = getStatus(voltageValue, currentValue, powerValue);
  return (
    <div className="bg-white w-[13rem] dark:bg-gray-400 rounded-lg shadow-sm p-2 border-t-4 border-[#1F5897]">
      <div className="flex justify-between items-center mb-3">
        <Image
          src={status.image}
          width={25}
          height={25}
          alt="Real time data stasu blinker"
        />
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate">
          {name}
        </h3>
        <Icon size={25} className={status.color} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center flex flex-col items-center justify-center border-r-1 border-gray-500 dark:border-white">
          <div className="font-semibold text-gray-900 dark:text-white">
            {voltageValue}
          </div>
          <div className="text-[11px] text-gray-700 uppercase dark:text-white">
            {voltageUnit}
          </div>
        </div>
        <div className="text-center flex flex-col items-center justify-center border-r-1 border-gray-500 dark:border-white">
          <div className=" font-semibold text-gray-900 dark:text-white">
            {currentValue}
          </div>
          <div className="text-[11px] text-gray-700 uppercase dark:text-white">
            {currentUnit}
          </div>
        </div>
        <div className="text-center flex flex-col items-center justify-center">
          <div className="font-semibold text-gray-900 dark:text-white">
            {powerValue}
          </div>
          <div className="text-[11px] text-gray-700 uppercase dark:text-white">
            {powerUnit}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimePowerCard;
