"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
interface RealTimeEventType {
  eventName: string;
  eventTriggerCounter: number;
  formatted: string;
}
export default function Events() {
  const [realTimeEvents, setRealTimeEvents] = useState<RealTimeEventType[]>([]);
  const fetchRealTimeEvents = async () => {
    try {
      const response = await fetch("http://192.168.2.99:1880/realtime-events");
      const resResult = await response.json();
      if (response.ok) {
        setRealTimeEvents(resResult);
      } else {
        console.log("Failed to fetch Real time events");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRealTimeEvents();
    const interval = setInterval(() => {
      fetchRealTimeEvents();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  // console.log("realt time events", realTimeEvents);

  return (
    <div className="w-full px-4 mx-auto  bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
      {/* <h1 className="text-2xl md:text-3xl font-bold text-[#1F5897] mb-6 text-center">Real-Time Events</h1> */}
      <div className="overflow-x-auto">
        <div className="max-h-[400px] overflow-y-auto">
          <Table className="w-full text-sm text-gray-700 dark:text-gray-300">
             <TableCaption className="pb-18">A list of all events.</TableCaption>
            <TableHeader className="sticky top-0 z-10">
              <TableRow className="bg-[#1F5897] text-white hover:bg-[#1F5897] dark:bg-[#1F5897]">
                <TableHead className="text-white sticky top-0 bg-[#1F5897] z-10">
                  Time Stamp
                </TableHead>
                <TableHead className="text-white sticky top-0 bg-[#1F5897] z-10">
                  Event Name
                </TableHead>
                <TableHead className="text-white sticky top-0 bg-[#1F5897] z-10">
                  Event Trigger Counter
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {realTimeEvents.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-4 text-gray-500"
                  >
                    No real-time events available
                  </TableCell>
                </TableRow>
              ) : (
                realTimeEvents?.map((event: RealTimeEventType) => (
                  <TableRow
                    key={event.eventName}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <TableCell className="py-3">
                      {event.formatted || "0000-00-00 00:00:00"}
                    </TableCell>
                    <TableCell className="py-3">{event.eventName}</TableCell>
                    <TableCell className="py-3">
                      {event.eventTriggerCounter}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
