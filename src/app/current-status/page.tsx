"use client";
import React, { useEffect, useState } from "react";
import { PowerMonitoringData } from "@/lib/interfaces/types";
import Loader from "@/components/loader";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Events from "../events/page";

// /////////////////////////////
type LightStatus = "red" | "yellow" | "green" | "default";

function getLightStatus(
  value: number,
  redThreshold: number,
  yellowThreshold: number,
  greenRange: [number, number]
): LightStatus {
  if (value > redThreshold) return "red";
  if (value < yellowThreshold) return "yellow";
  if (value >= greenRange[0] && value <= greenRange[1]) return "green";
  return "default";
}

const getImageForStatus = (status: LightStatus) => {
  switch (status) {
    case "red":
      return "/red_bl.gif";
    case "yellow":
      return "/yell_bl.gif";
    case "green":
      return "/green_bl.gif";
    default:
      return "/red_bl.gif"; // fallback
  }
};
const thresholds: Record<
  string,
  { red: number; yellow: number; greenRange: [number, number] }
> = {
  V1: { red: 240, yellow: 210, greenRange: [210, 240] },
  V2: { red: 240, yellow: 210, greenRange: [210, 240] },
  V3: { red: 240, yellow: 210, greenRange: [210, 240] },
  V12: { red: 430, yellow: 410, greenRange: [410, 430] },
  V23: { red: 430, yellow: 410, greenRange: [410, 430] },
  V31: { red: 430, yellow: 410, greenRange: [410, 430] },
  I1: { red: 10, yellow: 5, greenRange: [5, 10] },
  I2: { red: 10, yellow: 5, greenRange: [5, 10] },
  I3: { red: 10, yellow: 5, greenRange: [5, 10] },
  In: { red: 10, yellow: 5, greenRange: [5, 10] },
};
const ValueWithIndicator = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => {
  const config = thresholds[label];
  const status = config
    ? getLightStatus(value, config.red, config.yellow, config.greenRange)
    : "default";
  const imageSrc = getImageForStatus(status);

  return (
    <div className="flex justify-between border-b pb-1 items-center">
      <span className="font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span>{value}</span>
        <img src={imageSrc} alt={status} className="w-4 h-4" />
      </div>
    </div>
  );
};

// /////////////////////////////

const RealtimeDataCards = () => {
  const [realTimeData, setRealTimeData] = useState<PowerMonitoringData>();

  const fetchRealTimeData = async () => {
    try {
      const response = await fetch("http://192.168.2.99:1880/realtime-data");
      if (response.ok) {
        const resResult = await response.json();
        setRealTimeData(resResult);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRealTimeData();
    const interval = setInterval(() => {
      fetchRealTimeData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!realTimeData) {
    return (
      <div className="p-4 text-gray-600">
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="w-full mx-auto p-4 bg-gray-50 rounded-sm">
        <h1 className="text-2xl font-semibold text-black mb-4">
          Real Time Monitoring Dashboard
        </h1>

        <div className="bg-white rounded-lg shadow p-2 mb-2">
          <p className="text-sm text-gray-500">Timestamp</p>
          <p className="font-semibold text-gray-800">
            {new Date(realTimeData.timestamp).toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {/* each card */}
          {/* voltage cart */}
          <div className="bg-white rounded-xl shadow p-[.9rem] hover:scale-101 transition-all duration-300 border-t-2 border-t-[#1F5897]">
            <h2 className="text-lg font-semibold mb-2 text-[#1F5897]">
              Voltage (V)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
              <ValueWithIndicator label="V1" value={realTimeData.V1} />
              <ValueWithIndicator label="V2" value={realTimeData.V2} />
              <ValueWithIndicator label="V3" value={realTimeData.V3} />
              <ValueWithIndicator label="V12" value={realTimeData.V12} />
              <ValueWithIndicator label="V23" value={realTimeData.V23} />
              <ValueWithIndicator label="V31" value={realTimeData.V31} />
            </div>
          </div>

          {/* Current card */}
          <div className="bg-white rounded-xl shadow p-[.9rem] hover:scale-101 transition-all duration-300 border-t-2 border-t-[#1F5897]">
            <h2 className="text-lg font-semibold mb-2 text-[#1F5897]">
              Current (I)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
              <ValueWithIndicator label="I1" value={realTimeData.I1} />
              <ValueWithIndicator label="I2" value={realTimeData.I2} />
              <ValueWithIndicator label="I3" value={realTimeData.I3} />
              <ValueWithIndicator label="In" value={realTimeData.In} />
            </div>
          </div>
          {/* Current card */}
          <div className="bg-white rounded-xl shadow p-[.9rem] hover:scale-101 transition-all duration-300 border-t-2 border-t-[#1F5897]">
            <h2 className="text-lg font-semibold mb-2 text-[#1F5897]">
              Active Power (kW)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">P1</span>
                <span>{realTimeData.P1}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">P2</span>
                <span>{realTimeData.P2}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">P3</span>
                <span>{realTimeData.P3}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">P</span>
                <span>{realTimeData.P}</span>
              </div>
            </div>
          </div>
          {/* Current card */}
          <div className="bg-white rounded-xl shadow p-[.9rem] hover:scale-101 transition-all duration-300 border-t-2 border-t-[#1F5897]">
            <h2 className="text-lg font-semibold mb-2 text-[#1F5897]">
              Reactive Power (kVAR)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Q1</span>
                <span>{realTimeData.Q1}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Q2</span>
                <span>{realTimeData.Q2}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Q3</span>
                <span>{realTimeData.Q3}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Q</span>
                <span>{realTimeData.Q}</span>
              </div>
            </div>
          </div>
          {/* Current card */}
          <div className="bg-white rounded-xl shadow p-[.9rem] hover:scale-101 transition-all duration-300 border-t-2 border-t-[#1F5897]">
            <h2 className="text-lg font-semibold mb-2 text-[#1F5897]">
              Apparent Power (kVA)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">S1</span>
                <span>{realTimeData.S1}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">S2</span>
                <span>{realTimeData.S2}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">S3</span>
                <span>{realTimeData.S3}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">S</span>
                <span>{realTimeData.S}</span>
              </div>
            </div>
          </div>
          {/* Current card */}
          <div className="bg-white rounded-xl shadow p-[.9rem] hover:scale-101 transition-all duration-300 border-t-2 border-t-[#1F5897]">
            <h2 className="text-lg font-semibold mb-2 text-[#1F5897]">
              Power Factor
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">PF1</span>
                <span>{realTimeData.PF1}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">PF2</span>
                <span>{realTimeData.PF2}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">PF3</span>
                <span>{realTimeData.PF3}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">PF</span>
                <span>{realTimeData.PF}</span>
              </div>
            </div>
          </div>
          {/* Current card */}
          <div className="bg-white rounded-xl shadow p-[.9rem] hover:scale-101 transition-all duration-300 border-t-2 border-t-[#1F5897]">
            <h2 className="text-lg font-semibold mb-2 text-[#1F5897]">
              Frequency (Hz)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">F</span>
                <span>{realTimeData.F}</span>
              </div>
            </div>
          </div>
          {/* Current card */}
          <div className="bg-white rounded-xl shadow p-[.9rem] hover:scale-101 transition-all duration-300 border-t-2 border-t-[#1F5897]">
            <h2 className="text-lg font-semibold mb-2 text-[#1F5897]">
              Energy (kWh)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Import Active Energy</span>
                <span>{realTimeData["Import Active Energy"]}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Export Active Energy</span>
                <span>{realTimeData["Export Active Energy"]}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Import Reactive Energy</span>
                <span>{realTimeData["Import Reactive Energy"]}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Export Reactive Energy</span>
                <span>{realTimeData["Export Reactive Energy"]}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Apparent Energy</span>
                <span>{realTimeData["Apparent Energy"]}</span>
              </div>
            </div>
          </div>
          {/* Current card */}
          <div className="bg-white rounded-xl shadow p-[.9rem] hover:scale-101 transition-all duration-300 border-t-2 border-t-[#1F5897]">
            <h2 className="text-lg font-semibold mb-2 text-[#1F5897]">
              Quadrant Reactive Energy (kvarh)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">
                  1st Quadrant Reactive Energy - EQL+
                </span>
                <span>
                  {realTimeData["1st Quadrant Reactive Energy - EQL+"]}
                </span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">
                  2nd Quadrant Reactive Energy - EQC+
                </span>
                <span>
                  {realTimeData["2nd Quadrant Reactive Energy - EQC+"]}
                </span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">
                  3rd Quadrant Reactive Energy - EQL-
                </span>
                <span>
                  {realTimeData["3rd Quadrant Reactive Energy - EQL-"]}
                </span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">
                  4th Quadrant Reactive Energy - EQC-
                </span>
                <span>
                  {realTimeData["4th Quadrant Reactive Energy - EQC-"]}
                </span>
              </div>
            </div>
          </div>
          {/* Current card */}
          <div className="bg-white rounded-xl shadow p-[.9rem] hover:scale-101 transition-all duration-300 border-t-2 border-t-[#1F5897]">
            <h2 className="text-lg font-semibold mb-2 text-[#1F5897]">
              Fundamental Energy
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">
                  Fundamental Import Active Energy
                </span>
                <span>{realTimeData["Fundamental Import Active Energy"]}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">
                  Fundamental Export Active Energy
                </span>
                <span>{realTimeData["Fundamental Export Active Energy"]}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">
                  Fundamental Import Reactive Energy
                </span>
                <span>
                  {realTimeData["Fundamental Import Reactive Energy"]}
                </span>
              </div>
            </div>
          </div>
          {/* each card */}
        </div>
        <div></div>
      </div>
      <div className="fixed top-8 right-9 z-50 ">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Event</Button>
          </DrawerTrigger>

          {/* Drawer opens from bottom */}
          <DrawerContent className="h-[20rem] flex flex-col">
            {/* Scrollable area */}
            <div className="flex-1">
              <Events />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default RealtimeDataCards;
