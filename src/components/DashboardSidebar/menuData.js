import { RxDashboard } from "react-icons/rx";
import { RiProductHuntLine } from "react-icons/ri";
import { HiBars3 } from "react-icons/hi2";
import { PiExam } from "react-icons/pi";
import { MdSettingsAccessibility } from "react-icons/md";
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
    title: "Question",
    icon: <RiProductHuntLine />,
    path: "/dashboard/question-list",
  },
  {
    title: "Option",
    icon: <MdSettingsAccessibility />,
    path: "/dashboard/option-list",
  },
  {
    title: "Exam",
    icon: <PiExam />,
    path: "/dashboard/exam-list",
  },
  {
    title: "User",
    icon: <MdSettingsAccessibility />,
    path: "/dashboard/user-list",
  },
];
