// src/components/BarChart.js

import React from 'react';

const BarChart = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value));  // Find the max value to scale the bars

  return (
    <div className="w-full flex justify-center items-end gap-2 text-left z-50">
      <h2>Statistik</h2>
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          {/* Bar */}
          <div
            style={{ height: `${(item.value / maxValue) * 100}%` }}
            className="bg-blue-500 w-10 mb-2 rounded"
          />
          {/* Label */}
          <span className="text-xs text-gray-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
