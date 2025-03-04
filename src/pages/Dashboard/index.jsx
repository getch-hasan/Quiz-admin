import React, { useEffect, useState } from "react";
import { TotalStudentsChart } from "./chart/TotalStudentsChart";
import ExamStatisticsChart from "./chart/ExamStatisticsChart";
import PassFailRateChart from "./chart/PassFailRateChart";

export const Dashboard = () => {
  return (
    <>
      <TotalOrders />
    </>
  );
};

const TotalOrders = () => {
  const [totalSales, setTotalSales] = useState(15000);
  const [totalOrderAmount, setTotalOrderAmount] = useState(30000);
  const [averageOrderValue, setAverageOrderValue] = useState(0);

  // Calculate average order value
  // useEffect(() => {
  //   if (totalOrderAmount > 0) {
  //     setAverageOrderValue(totalSales / totalOrderAmount);
  //   }
  // }, [totalSales, totalOrderAmount]);

  return (
    <div>
      <h1 className="text-3xl mt-5 font-bold">Dashboard</h1>
      <p className="mt-4">Welcome to the admin panel.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3  gap-6">
        <div className="bg-[#4cd964] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Student</h2>
          <p className="text-2xl font-bold mt-2">15000</p>
        </div>

        <div className="bg-[#4cd964] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Active Student</h2>
          <p className="text-2xl font-bold mt-2">10000</p>
        </div>

        <div className="bg-[#4cd964] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Ongoing Exam</h2>
          <p className="text-2xl font-bold mt-2">100</p>
        </div>
        <div className="bg-[#4cd964] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Complete Exam</h2>
          <p className="text-2xl font-bold mt-2">500</p>
        </div>
        <div className="bg-[#4cd964] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Pass Rate</h2>
          <p className="text-2xl font-bold mt-2">70%</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5 mt-5 ">
        {/* Add the TotalStudentsChart here */}
        <div className="w-full  ">
          <TotalStudentsChart />
        </div>
        {/* Add the TotalStudentsChart here */}
        <div className="w-full  ">
          <ExamStatisticsChart />
        </div>
      </div>
      <div className="w-full mt-5">
        <PassFailRateChart />
      </div>
    </div>
  );
};
