import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Total Students',
    value: 15000,
  },
  {
    name: 'Active Students',
    value: 10000,
  },
  {
    name: 'Inactive Students',
    value: 5000,
  }
];

export const TotalStudentsChart = () => {
  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">Total Students</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#4cd964"  />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};