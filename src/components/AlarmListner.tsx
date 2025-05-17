'use client'
import { useEffect, useState } from 'react';
interface Alarm {
  type: string;
  phase: string;
  value: string | number;
  timestamp: string;
}

const AlarmListener = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  console.log("Alarm data",alarms)

  useEffect(() => {
    // Replace with your Node-RED server's IP and port
    const socket = new WebSocket('ws://192.168.2.99:1880//ws/alarms');

    // When a message is received, update state
    socket.onmessage = (event) => {
      const alarmData:Alarm = JSON.parse(event.data);
      console.log("🚨 Alarm Received:", alarmData);

      // Update the state to display the alarms
      setAlarms((prev) => [alarmData, ...prev]);
    };

    socket.onopen = () => {
      console.log("✅ WebSocket connection established.");
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
    };

    socket.onclose = () => {
      console.log("❌ WebSocket connection closed.");
    };

    // Clean up when the component unmounts
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Real-Time Alarms</h2>
      <div className="space-y-2">
        {alarms.length > 0 ? (
          alarms.map((alarm:any, index) => (
            <div key={index} className="bg-red-100 p-2 rounded-md">
              <p>🔴 <strong>{alarm.type}</strong> at <strong>{alarm.phase}</strong></p>
              <p>Value: {alarm.value}</p>
              <p>Time: {alarm.timestamp}</p>
            </div>
          ))
        ) : (
          <p>No alarms triggered yet.</p>
        )}
      </div>
    </div>
  );
};

export default AlarmListener;