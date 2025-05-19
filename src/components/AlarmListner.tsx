"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const AlarmListner = () => {
  const [alarms, setAlarms] = useState<any | undefined>();
  console.log("object", alarms);
  const fetchAlarmData = async () => {
    try {
      const response = await fetch("http://192.168.2.99:1880/alarms");
      const resResult = await response.json();
      if (response.ok) {
        setAlarms(resResult);
      } else {
        console.log("error response", resResult);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAlarmData();
    const interval = setInterval(() => {
      fetchAlarmData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
      <h1 className="text-2xl md:text-3xl font-bold text-[#1F5897] mb-6 text-center">
        Real-Time Alarms
      </h1>
      <div className="overflow-x-auto">
        <Table className="w-full text-sm text-gray-700 dark:text-gray-300">
          <TableHeader>
            <TableRow className="bg-[#1F5897] hover:bg-[#527092] text-white dark:bg-[#1F5897]">
              <TableHead className="text-white">Start Time</TableHead>
              <TableHead className="text-white">Alarm Type</TableHead>
              <TableHead className="text-white">Specific Phase</TableHead>
              <TableHead className="text-white">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alarms &&
            alarms.length === 1 &&
            alarms[0].message?.toLowerCase() === "no active alarms" ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-4 text-gray-500"
                >
                  No alarm available yet!
                </TableCell>
              </TableRow>
            ) : (
              alarms?.map((event: any) => (
                <TableRow
                  key={event.alarmType}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <TableCell className="py-3">
                    {new Date(event.startTime).toLocaleString() ||
                      "0000-00-00 00:00:00"}
                  </TableCell>
                  <TableCell className="py-3">{event.alarmType}</TableCell>
                  <TableCell className="py-3">{event.specificPhase}</TableCell>
                  <TableCell className="py-3">{event.value}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AlarmListner;
