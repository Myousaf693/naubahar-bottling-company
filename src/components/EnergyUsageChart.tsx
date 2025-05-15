'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React from 'react';
import { useTheme } from 'next-themes';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = [
  'Water Treatment', 'Turbine 1', 'Syrup Room', 'Air Compressor(+2)', 'Air Comp(1+2)',
  'Grasso 4', 'Grasso 3', 'Grasso 2', 'Grasso 1', 'Evaporators',
  'Line - 5', 'Line - 4', 'Line - 3', 'Boiler'
];

const energyData = [
  1806, 1052, 572, 2000, 0,
  4994, 4869, 399, 10117, 8015,
  0, 556, 4213, 2500
];

const colors = [
  '#800000', '#7CFC00', '#FFB6C1', '#FFD700', '#FFA500',
  '#9370DB', '#8A2BE2', '#0000FF', '#4B0082', '#20B2AA',
  '#8B0000', '#FF0000', '#FFA07A', '#2F4F4F'
];

const data: ChartData<'bar'> = {
  labels,
  datasets: [
    {
      data: energyData,
      backgroundColor: colors,
      borderWidth: 1,
    },
  ],
};



const EnergyUsageChart = () => {
    const {theme} = useTheme();
    const labelColor = theme === 'dark' ? '#ffffff': '#000000';
    const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    
  },
  scales: {
    y: {
      beginAtZero: true,
      suggestedMax: 12000,
      ticks:{
        color:labelColor,
        font: {
          size: 14,
        }
      }
    },
    x:{
        ticks:{
        color:labelColor,
        font: {
          size: 14,
        }
      }
    }
  },
};
  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Energy Usage (kWh)</h2>
        <select className="border px-2 py-1 rounded bg-white dark:bg-gray-500 dark:border-white focus:outlien-none outline-none border-gray-600">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <Bar data={data} options={options} />
        </div>

        {/* Custom legend with scroll */}
        <div className="w-full md:w-1/3 h-64 overflow-y-auto border-l pl-4">
          {labels.map((label, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span
                  className="inline-block w-3 h-3 mr-2 rounded-sm"
                  style={{ backgroundColor: colors[index] }}
                ></span>
                <span className="text-sm">{label}</span>
              </div>
              <span className="text-sm font-medium">{energyData[index] || 0} kWh</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnergyUsageChart;
