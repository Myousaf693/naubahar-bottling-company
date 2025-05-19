"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Loader from "./loader";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

type DataPoint = {
  timestamp: string;
  [key: string]: number | string;
};

const HistoryOfRealTime = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [allKeys, setAllKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchHistoricalData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://192.168.2.99:1880/historical-data");
      const result = await response.json();
      const values = Object.values(result) as DataPoint[];

      const keys = Object.keys(values[0] || {}).filter(
        (k) => k !== "timestamp" && k !== "_id"
      );
      setAllKeys(keys);
      setData(values);
    } catch (error) {
      console.error("fetching error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoricalData();
  }, []);

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.timestamp);
    const itemDateOnly = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());

    const startDateOnly = startDate
      ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
      : null;

    const endDateOnly = endDate
      ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
      : null;

    if (!startDateOnly && !endDateOnly) return false;
    if (startDateOnly && endDateOnly) {
      return itemDateOnly >= startDateOnly && itemDateOnly <= endDateOnly;
    }
    return true;
  });

  const chartData = {
    labels: filteredData.map((d) => new Date(d.timestamp).toLocaleString()),
    datasets: selectedKeys.map((key, i) => ({
      label: key,
      data: filteredData.map((d) => d[key] as number),
      borderColor: ["#8884d8", "#82ca9d", "#ff7300", "#00bcd4", "#e91e63"][i % 5],
      backgroundColor: "transparent",
      fill: false,
      tension: 0.4,
    })),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Selected Parameters`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Timestamp'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value'
        }
      }
    }
  };

  const toggleKey = (key: string) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setDate: (date: Date | null) => void
  ) => {
    const value = e.target.value;
    if (value) {
      setDate(new Date(value));
    } else {
      setDate(null);
    }
  };

  const formatDateForInput = (date: Date | null) =>
    date ? date.toISOString().split("T")[0] : "";

  const canShowChartData = selectedKeys.length > 0 && startDate && endDate;

  return (
    <div className="w-full p-4 space-y-6">
      <div className="flex flex-wrap gap-6 items-start">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Select Parameter</Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <ScrollArea className="h-64">
              {allKeys.map((key) => (
                <div key={key} className="flex items-center space-x-2 py-1">
                  <Checkbox
                    id={`checkbox-${key}`}
                    checked={selectedKeys.includes(key)}
                    onCheckedChange={() => toggleKey(key)}
                  />
                  <label htmlFor={`checkbox-${key}`}>{key}</label>
                </div>
              ))}
            </ScrollArea>
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-1">
          <label className="text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={formatDateForInput(startDate)}
            onChange={(e) => handleDateChange(e, setStartDate)}
            className="bg-white border px-3 py-1 rounded"
          />
        </div>

        <div className="flex items-center gap-1">
          <label className="text-sm font-medium">End Date</label>
          <input
            type="date"
            value={formatDateForInput(endDate)}
            onChange={(e) => handleDateChange(e, setEndDate)}
            className="bg-white border px-3 py-1 rounded"
          />
        </div>
      </div>

      <div className="w-full h-[550px]">
        {loading ? (
          <Loader />
        ) :( canShowChartData ? (
          selectedKeys.length > 0 && (
            <>
              <Line data={chartData} options={chartOptions} />
              <div className="mt-4 text-sm text-gray-500">
                Showing {filteredData.length} records between
                {startDate ? ` ${startDate.toLocaleDateString()}` : " earliest"} and
                {endDate ? ` ${endDate.toLocaleDateString()}` : " latest"}
              </div>
            </>
          )
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            {selectedKeys.length === 0
              ? "Please select at least one parameter"
              : !startDate && !endDate
              ? "Please select start and end date"
              : "Please select fields correctly"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryOfRealTime;
