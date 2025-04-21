import React, { useCallback, useEffect, useState } from "react";
import Card from "./card/Card";
import CalendarComponent from "./calender/Calender";
import RecentOrderChart from "./Chart/RecentOrderChart";
import EarningsChart from "./Chart/EarningsChart";
import ShowTable from "./table/ShowTable";
import { MyCalendar } from "./calender/MyCalendar";
import { NetworkServices } from "../../network";
import { networkErrorHandeller, responseChecker } from "../../utils/helpers";

const Dashboard = () => {
    const [dashboard, setDashboard] = useState([]);
    const [loading, setLoading] = useState(false);
  
    console.log("categories", dashboard);
  
    // Fetch categories from API
    const fetchDashboard = useCallback(async () => {
      setLoading(true);
      try {
        const response = await NetworkServices.Dashboard.index();
        console.log("response",response)
  
        if (responseChecker(response, 200)) {
          setDashboard(response?.data?.data || []);
        }
      } catch (error) {
        console.log(error);
        networkErrorHandeller(error);
      }
      setLoading(false);
    }, []);
  
    useEffect(() => {
      fetchDashboard();
    }, [fetchDashboard]);
  return (
    <div>
      <Card dashboard={dashboard} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4 mt-8">
        <div className="col-span-4 ">
          <CalendarComponent />
          {/* <MyCalendar/> */}
        </div>
        {/* <div className="col-span-4">
          <RecentOrderChart />
        </div> */}
              <div className=" col-span-4">
          <EarningsChart dashboard={dashboard} />
        </div>
  
      </div>
      {/* <div className="mt-8">
          <EarningsChart dashboard={dashboard} />
        </div> */}
      <div className="mt-8">
        <ShowTable dashboard={dashboard}/>
      </div>
    </div>
  );
};

export default Dashboard;
