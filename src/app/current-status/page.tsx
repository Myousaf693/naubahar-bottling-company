'use client'
import React, { useEffect, useState } from "react";
import {PowerMonitoringData} from '@/lib/interfaces/types'

const renderGroup = (title: string, keys:(keyof PowerMonitoringData)[], obj:PowerMonitoringData) => (
  <div className="bg-white rounded-xl shadow p-[.9rem] hover:scale-101 transition-all duration-300 border-t-2 border-t-[#1F5897]">
    <h2 className="text-lg font-semibold mb-2 text-[#1F5897]">{title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
      {keys.map((key) => (
        <div key={key} className="flex justify-between border-b pb-1">
          <span className="font-medium">{key}</span>
          <span>{obj[key]}</span>
        </div>
      ))}
    </div>
  </div>
);

const RealtimeDataCards = () => {
  const [realTimeData, setRealTimeData] = useState<PowerMonitoringData>()

  const fetchRealTimeData = async()=>{
    try {
      const response = await fetch('http://192.168.2.99:1880/realtime-data');
      if(response.ok){
        const resResult = await response.json();
        setRealTimeData(resResult);
      }else{
        throw new Error("Failed to fetch data")
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchRealTimeData();
    const interval = setInterval(() => {
      fetchRealTimeData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

if (!realTimeData) {
    return <div className="p-4 text-gray-600">Loading real-time data...</div>;
  }

  return (
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
        {renderGroup("Voltage (V)", ["V1", "V2", "V3", "V12", "V23", "V31"], realTimeData)}
        {renderGroup("Current (A)", ["I1", "I2", "I3", "In"], realTimeData)}
        {renderGroup("Active Power (kW)", ["P1", "P2", "P3", "P"], realTimeData)}
        {renderGroup("Reactive Power (kVAR)", ["Q1", "Q2", "Q3", "Q"], realTimeData)}
        {renderGroup("Apparent Power (kVA)", ["S1", "S2", "S3", "S"], realTimeData)}
        {renderGroup("Power Factor", ["PF1", "PF2", "PF3", "PF"], realTimeData)}
        {renderGroup("Frequency (Hz)", ["F"], realTimeData)}
        {renderGroup("Energy (kWh)", [
          "Import Active Energy",
          "Export Active Energy",
          "Import Reactive Energy",
          "Export Reactive Energy",
          "Apparent Energy",
        ], realTimeData)}
        {renderGroup("Quadrant Reactive Energy (kvarh)", [
          "1st Quadrant Reactive Energy - EQL+",
          "2nd Quadrant Reactive Energy - EQC+",
          "3rd Quadrant Reactive Energy - EQL-",
          "4th Quadrant Reactive Energy - EQC-",
        ], realTimeData)}
        {renderGroup("Fundamental Energy", [
          "Fundamental Import Active Energy",
          "Fundamental Export Active Energy",
          "Fundamental Import Reactive Energy",
        ], realTimeData)}
      </div>
    </div>
  );
};

export default RealtimeDataCards;
