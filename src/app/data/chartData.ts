// utils/chartData.ts

export const labelOptions: { [key: string]: string[] } = {
  daily: ["10:00", "10:05", "10:10", "10:15", "10:20"],
  weekly: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  monthly: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
  yearly: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ],
};

// Utility to generate dummy data (simulate API)
export const generateChartDataSets = (range: string) => {
  const length = labelOptions[range].length;
  const randomData = (scale: number) =>
    Array.from({ length }, () => parseFloat((Math.random() * scale).toFixed(2)));

  return {
    current: {
      label: "Current (A)",
      data: randomData(1),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    },
    voltage: {
      label: "Voltage (V)",
      data: randomData(250),
      borderColor: "rgb(54, 162, 235)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
    },
    power: {
      label: "Power (kW)",
      data: randomData(5).map((val) => val * -1),
      borderColor: "rgb(255, 206, 86)",
      backgroundColor: "rgba(255, 206, 86, 0.2)",
    },
    harmonics: {
      label: "Harmonics (%)",
      data: randomData(10),
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    },
  };
};
