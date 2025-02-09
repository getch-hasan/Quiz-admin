import { RxDashboard } from "react-icons/rx";
import { RiProductHuntLine } from "react-icons/ri";
import { HiBars3 } from "react-icons/hi2";
import { PiExam } from "react-icons/pi";
import { MdSettingsAccessibility } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { IoOptions } from "react-icons/io5";
export const menuData = [
  {
    title: "Dashboard",
    icon: <RxDashboard />,
    path: "/dashboard",
  },
  {
    title: "Category",
    icon: <HiBars3 />,
    path: "/dashboard/category",
  },
  {
    title: "Exam",
    icon: <PiExam />,
    path: "/dashboard/exam-list",
  },
  {
    title: "Question",
    icon: <RiProductHuntLine />,
    path: "/dashboard/question-list",
  },
  {
    title: "Option",
    icon: <IoOptions />,
    path: "/dashboard/option-list",
  },

  {
    title: "Testimonial",
    icon: <FaNoteSticky />,
    path: "/dashboard/testimonial-list",
  },
  {
    title: "User",
    icon: <MdSettingsAccessibility />,
    path: "/dashboard/user-list",
  },
];
