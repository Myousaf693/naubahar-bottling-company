"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useState } from "react";
import { generateChartDataSets, labelOptions } from '../data/chartData' 

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip
);

const AlarmHistory = () => {
  const [selectedLines, setSelectedLines] = useState<string[]>(["current"]);
  const [selectedRange, setSelectedRange] = useState<"daily" | "weekly" | "monthly" | "yearly">(
    "daily"
  );

  const chartDataSets = generateChartDataSets(selectedRange);
  const labels = labelOptions[selectedRange];

  const handleCheckboxChange = (type: string) => {
    setSelectedLines((prev) =>
      prev.includes(type)
        ? prev.length === 1
          ? prev // prevent unchecking the last item
          : prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const range = e.target.value as "daily" | "weekly" | "monthly" | "yearly";
    setSelectedRange(range);
  };

  const data = {
    labels,
    datasets: selectedLines.map((type) => chartDataSets[type]),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 250,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white dark:bg-gray-800 rounded shadow">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold">Machine Data Chart</h2>
        <select
          value={selectedRange}
          onChange={handleRangeChange}
          className="border border-gray-300 rounded px-3 py-1 text-sm dark:bg-gray-700 dark:text-white"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="w-full h-[500px]">
        <Line data={data} options={options} />
      </div>

      <div className="flex gap-6 mt-6 justify-center flex-wrap">
        {["current", "voltage", "power", "harmonics"].map((type) => (
          <label key={type} className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={selectedLines.includes(type)}
              onChange={() => handleCheckboxChange(type)}
              className="accent-[#1F5897]"
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default AlarmHistory;
