import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NetworkServices } from "../../network";
import { networkErrorHandeller, responseChecker } from "../../utils/helper";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import { SkeletonForm } from "../../components/loading/skeleton-table";
import { GiSandsOfTime } from "react-icons/gi";
import { GrAchievement } from "react-icons/gr";
import { FcQuestions } from "react-icons/fc";

const Show = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { userId } = useParams();
 

  // Fetch user details
  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Authentication.show(userId);
      if (responseChecker(response, 200)) {
        setUser(response?.data?.data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="text-center">
        <PageHeaderSkeleton />
        <br />
        <SkeletonForm />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 gap-6">
        {user?.exam_list?.map((exam) => (
          <div
            key={exam?.exam_id}
            className="relative h-32 md:h-40 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-300"
              style={{
                backgroundImage: exam?.exam?.thumbnail
                  ? `url(${process.env.REACT_APP_API_SERVER}${exam?.exam?.thumbnail})`
                  : `url('/images/exam.jpg')`,
              }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Exam Details */}
            <div className="relative z-10 p-4 flex flex-col justify-end h-full text-white">
              <h3 className="font-bold text-lg">{exam?.exam_name}</h3>
              <p className="text-sm opacity-90 flex items-center gap-2">
                <GiSandsOfTime className="text-primary" />{" "}
                <span>Exam Name: {exam?.exam?.exam_name} minutes</span>
              </p>
              <p className="text-sm opacity-90 flex items-center gap-2">
                <GrAchievement className="text-primary" /> Total Mark:{" "}
                {exam?.exam?.total_marks}
              </p>
              <p className="text-sm opacity-90 flex items-center gap-2">
                <FcQuestions /> Questions: {exam?.exam?.total_questions}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Show;
