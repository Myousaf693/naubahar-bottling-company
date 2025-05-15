'use client';

import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  ChartOptions,
  ChartData,
  ChartTypeRegistry,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register necessary elements
ChartJS.register(ArcElement, Tooltip);

// Plugin to draw the needle
const needlePlugin = {
  id: 'needle',
  afterDatasetDraw(chart: any) {
    const { ctx, chartArea, config } = chart;
    const needleValue = config.options.needleValue || 0;

    const angle = Math.PI + (1 * Math.PI * needleValue) / 100;
    const cx = chart._metasets[0].data[0].x;
    const cy = chart._metasets[0].data[0].y;
    const radius = chart._metasets[0].data[0].outerRadius;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -2);
    ctx.lineTo(radius * 0.9, 0);
    ctx.lineTo(0, 2);
    ctx.fillStyle = '#444';
    ctx.fill();
    ctx.restore();

    // Center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#444';
    ctx.fill();
  },
};

ChartJS.register(needlePlugin as any);

type GaugeChartProps = {
  value: number;
};

const VoltageCurrentMeter: React.FC<GaugeChartProps> = ({ value }) => {
  const data: ChartData<'doughnut'> = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [
      {
        data: [33, 34, 33],
        backgroundColor: ['#FF0000',"#ffb000"],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
       
      },
    ],
  };

  const options: ChartOptions<'doughnut'> & { needleValue: number } = {
    responsive: true,
    maintainAspectRatio:false,
    needleValue: value,
     cutout: '90%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-[250px] h-[170px]">
      <Doughnut data={data} options={options}/>
    </div>
  );
};

export default VoltageCurrentMeter;
