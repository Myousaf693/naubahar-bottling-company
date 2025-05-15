"use client";
import React, { useState } from "react";
import CunsumptionCard from "@/components/CunsumptionCard";
import { cunsumptionCardsData } from "../data/consumptionCardsData";
import Image from "next/image";
import { MdFullscreen } from "react-icons/md";
import { energyDataDetails } from "@/app/data/energyDataDetails";
import VoltageCurrentMeter from "@/components/VoltageCurrentMeter";
import EnergyUsageChart from "@/components/EnergyUsageChart";
import FullScreenRealTimePowerCards from "@/components/FullScreenRealTimePowerCards";
import { RxCross2 } from "react-icons/rx";
import RealTimePowerCard from "@/components/RealTimePowerCard";

export default function HomePage() {
  const [current, setCurrent] = useState(30);
  const [voltage, setVoltage] = useState(80);
  const [openRealTimeFullScreen, setOpenRealTimeFullScreen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-[url('/breadcrumb-bg.jpg')] w-full object-cover bg-center rounded-sm">
        {/* div for overlay */}
        <div className="bg-blue-600/40 dark:bg-blue-600/30 p-4 rounded-sm">
          <h2 className="text-white font-semibold text-3xl">
            Naubahar Bottling Company (Pvt.) Ltd
          </h2>
          <p className="text-white font-semibold text-md">EMS - Unit 1</p>
          <span className="text-white text-sm font-semibold">
            Welcome to Jahaann
          </span>
        </div>
      </div>
      {/* consumption */}
      <div className="flex p-1 items-center justify-between gap-2 md:flex-col">
        {/* left */}
        <div className="md:w-full bg-[#E6EAF3] dark:bg-gray-500 border-t-2 border-t-[#80A1D7] rounded-sm flex flex-col items-center pb-4 justify-center w-[60%]">
          <div className="w-full px-5 py-2">
            <div className="flex items-center text-center">
              <Image
                src="/output-onlinegiftools.gif"
                width={40}
                height={40}
                alt="consumptoin icon"
              />
              <h2 className="text-2xl font-semibold">Total Consumption</h2>
            </div>
            <span className="text-gray-500 dark:text-white text-xs">
              Monitor your energy usage across different time periods
            </span>
          </div>
          <div className="w-full  flex items-center justify-around p-2">
            {cunsumptionCardsData.map((item) => (
              <CunsumptionCard
                key={item.period}
                period={item.period}
                icon={item.icon}
                value={item.value}
                unit={item.unit}
                updated={item.updated}
                direction={item.direction}
                percentage={item.percentage}
                iconcolor={item.iconcolor}
              />
            ))}
          </div>
        </div>
        {/* right */}
        <div className="md:w-full bg-[#E6EAF3] dark:bg-gray-500 border-t-2 border-t-[#80A1D7] rounded-sm w-[40%] h-[16rem] flex items-center justify-around">
          <div>
            <VoltageCurrentMeter value={voltage} />
            <div className="text-center font-semibold text-xl">
              <div className="text-center font-semibold text-xl">
                <span>Voltage: {voltage}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={voltage}
                  onChange={(e) => setVoltage(Number(e.target.value))}
                  className="w-full mt-4"
                />
              </div>
            </div>
          </div>
          <div>
            <VoltageCurrentMeter value={current} />
            <div className="text-center font-semibold text-xl">
              <span>Current: {current}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={current}
                onChange={(e) => setCurrent(Number(e.target.value))}
                className="w-full mt-4"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Real time readings */}
      <div className="w-full  flex item-center gap-2 md:flex-col">
        <div className="w-[50%] md:w-full bg-[#E6EAF3] dark:bg-gray-500 dark:text-white rounded-sm p-2 border-t-2 border-t-[#80A1D7]">
          <div className="bg-[#7EA5C5] flex items-center px-4 rounded-sm justify-between p-2">
            <h3 className="text-white text font-semibold">Real Time Values</h3>
            <div>
              <button
                onClick={() => setOpenRealTimeFullScreen(true)}
                className="bg-transparent text-white px-4 py-2 rounded"
              >
                <MdFullscreen 
                  size={25}
                  color="white"
                  className="cursor-pointer"
                />
              </button>

              {openRealTimeFullScreen && (
                <div className="fixed top-10 left-23 m-auto w-[90%] h-[90vh] bg-[#E6EAF3] dark:bg-gray-500 dark:text-white z-50 overflow-hidden p-8">
                  <div className="bg-[#7EA5C5] flex items-center px-4 rounded-sm justify-between p-2">
                    <h2 className="text-xl font-bold text-white">
                      Real Time Values
                    </h2>
                    <button
                      onClick={() => setOpenRealTimeFullScreen(false)}
                      className=""
                    >
                      <RxCross2
                        size={25}
                        color="white"
                        className="cursor-pointer"
                      />
                    </button>
                  </div>
                  <div className="flex mt-6 flex-wrap gap-4 justify-around">
                    {energyDataDetails.map((item) => (
                      <FullScreenRealTimePowerCards
                        key={item.name}
                        name={item?.name}
                        voltageValue={item?.voltage?.value}
                        voltageUnit={item?.voltage?.unit}
                        currentValue={item?.current?.value}
                        currentUnit={item?.current?.unit}
                        powerValue={item?.power?.value}
                        powerUnit={item?.power?.unit}
                        icon={item?.icon}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full overflow-x-auto space-y-3 py-5">
            {/* First Row */}
            <div className="grid grid-flow-col auto-cols-[minmax(220px,1fr)] pl-1 pb-3">
              {energyDataDetails
                .slice(0, Math.ceil(energyDataDetails.length / 2))
                .map((item) => (
                  <RealTimePowerCard
                    key={item?.name || "default-key"}
                    name={item?.name || "Loading..."}
                    voltageValue={item?.voltage?.value || 0}
                    voltageUnit={item?.voltage?.unit || "V"}
                    currentValue={item?.current?.value || 0}
                    currentUnit={item?.current?.unit || "A"}
                    powerValue={item?.power?.value || 0}
                    powerUnit={item?.power?.unit || "kW"}
                    icon={item?.icon}
                  />
                ))}
            </div>

            {/* Second Row */}
            <div className="grid grid-flow-col auto-cols-[minmax(220px,1fr)] pl-1">
              {energyDataDetails
                .slice(Math.ceil(energyDataDetails.length / 2))
                .map((item) => (
                  <RealTimePowerCard
                    key={item?.name || "default-key"}
                    name={item?.name || "Loading..."}
                    voltageValue={item?.voltage?.value || 0}
                    voltageUnit={item?.voltage?.unit || "V"}
                    currentValue={item?.current?.value || 0}
                    currentUnit={item?.current?.unit || "A"}
                    powerValue={item?.power?.value || 0}
                    powerUnit={item?.power?.unit || "kW"}
                    icon={item?.icon}
                  />
                ))}
            </div>
          </div>
        </div>
        {/*  Energy usage */}
        <div className="w-[50%] md:w-full p-2 bg-[#E6EAF3] dark:bg-gray-500 dark:text-white border-t-2 border-t-[#80A1D7] rounded-md">
          <EnergyUsageChart />
        </div>
      </div>
    </div>
  );
}
