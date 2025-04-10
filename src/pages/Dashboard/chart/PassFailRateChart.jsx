import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const PassFailRateChart = () => {
  const data = {
    labels: ["Passed", "Failed"], // Labels for the chart
    datasets: [
      {
        data: [70, 30], // 70% Passed, 30% Failed
        backgroundColor: ["#4cd964", "#ff4d4d"], // Green for Passed, Red for Failed
        hoverBackgroundColor: ["#32a852", "#ff1a1a"], // Hover colors
        borderWidth: 0, // No border for the segments
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Position of the legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": " + tooltipItem.raw + "%"; // Show percentage on hover
          },
        },
      },
    },
  };

  return (
    <div className="bg-white  rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Pass/Fail Rate</h2>
      <div className="mt-4 flex items-center justify-center w-full h-96">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default PassFailRateChart;
