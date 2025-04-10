import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registering the chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExamStatisticsChart = () => {
  const data = {
    labels: [ "Complete Exam","Ongoing Exam",],
    datasets: [
      {
        data: [500, 100], // Your data points
        backgroundColor: ["#4cd964","#ffb84d"], // Pie chart segment colors
        hoverBackgroundColor: ["#32a852", "#ff7f00"],
       
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": " + tooltipItem.raw;
          },
        },
      },
    },
  };

  return (
    <div className="bg-w  rounded-lg  ">
      <h2 className="text-xl font-semibold">Exam Statistics</h2>
      <div className="  flex items-center justify-center h-[300px] ">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ExamStatisticsChart;
