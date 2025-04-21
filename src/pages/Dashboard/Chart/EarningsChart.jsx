import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const monthlyExamData = [
  { month_name: "January", total_exams: 12 },
  { month_name: "February", total_exams: 8 },
  { month_name: "March", total_exams: 19 },
  { month_name: "April", total_exams: 24 },
  { month_name: "May", total_exams: 17 },
  { month_name: "June", total_exams: 29 },
  { month_name: "July", total_exams: 14 },
  { month_name: "August", total_exams: 21 },
  { month_name: "September", total_exams: 10 },
  { month_name: "October", total_exams: 26 },
  { month_name: "November", total_exams: 7 },
  { month_name: "December", total_exams: 30 },
];

export default function EarningsChart({dashboard}) {
  return (
    <div className="h-[450px] p-3 shadow-md rounded-md dark:bg-darkCard bg-lightCard text-lightTitle dark:text-darkTitle">
      <h2 className="text-lg font-semibold mb-4">Monthly Exam Overview</h2>

      <ResponsiveContainer width="100%" >
        <BarChart data={dashboard.latest_exam} barSize={100}>
          <XAxis dataKey="month_name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
         
          {/* <Tooltip /> */}
          <Legend />
          <Bar dataKey="total_exams" fill="#3b82f6" name="Total Exams" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

