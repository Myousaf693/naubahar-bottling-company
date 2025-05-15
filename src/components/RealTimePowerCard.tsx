
import Image from 'next/image'
import React from 'react'
import { PiFanFill } from 'react-icons/pi'
export type EnergyDetailType = {
  name: string;
  voltageValue: number;
  voltageUnit: string;
  currentValue: number;
  currentUnit: string;
  powerValue: number;
  powerUnit: string;
};

// Component Props
type RealTimePowerCardProps = EnergyDetailType;

const RealTimePowerCard:React.FC<RealTimePowerCardProps> = ({name, voltageValue, voltageUnit, currentValue, currentUnit, powerValue, powerUnit}) => {
    const statusImage = 
  voltageValue > 0 && currentValue > 0 && powerValue > 0
    ? '/green_bl.gif'
    : voltageValue > 0 || currentValue > 0 || powerValue > 0
      ? '/yell_bl.gif'
      : '/red_bl.gif';
  return (
   <div className="bg-white w-full rounded-lg shadow-sm p-2 border-t-4 border-[#1F5897]">
  <div className="flex justify-between items-center mb-3">
    <Image src={statusImage} width={25} height={25} alt='Real time data stasu blinker'/>
    <h3 className="text-sm font-semibold text-gray-800 truncate">{name}</h3>
    <PiFanFill size={25} className="text-blue-500 text-lg"/>
  </div>
  <div className="grid grid-cols-3 gap-2">
    <div className="text-center flex flex-col items-center justify-center border-r-1 border-gray-500">
      <div className="font-semibold text-gray-900">{voltageValue}</div>
      <div className="text-[11px] text-gray-700 uppercase">{voltageUnit}</div>
    </div>
    <div className="text-center flex flex-col items-center justify-center border-r-1 border-gray-500">
      <div className=" font-semibold text-gray-900">{currentValue}</div>
      <div className="text-[11px] text-gray-700 uppercase">{currentUnit}</div>
    </div>
    <div className="text-center flex flex-col items-center justify-center">
      <div className="font-semibold text-gray-900">{powerValue}</div>
      <div className="text-[11px] text-gray-700 uppercase">{powerUnit}</div>
    </div>
  </div>
</div>
  )
}

export default RealTimePowerCard
