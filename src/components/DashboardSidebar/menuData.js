import { RxDashboard } from "react-icons/rx";
import { IoColorPaletteOutline } from "react-icons/io5";
import { RiGalleryFill, RiProductHuntLine } from "react-icons/ri";
import { FaUnity } from "react-icons/fa";
import { CgAttribution } from "react-icons/cg";
import { HiBars3 } from "react-icons/hi2";
import { PiExam } from "react-icons/pi";
import {
  MdOutlineProductionQuantityLimits,
  MdBrandingWatermark,
  MdSettingsAccessibility,
  MdOutlineCategory,
} from "react-icons/md";
export const menuData = [
  {
    title: "Dashboard",
    icon: <RxDashboard />,
    path: "/dashboard",
  },
  {
    title: "Category",
    icon: <HiBars3 />,
    childrens: [
      {
        title: "Category List",
        icon: <IoColorPaletteOutline />,
        path: "/dashboard/category",
      },
      {
        title: " Create Category",
        icon: <IoColorPaletteOutline />,
        path: "/dashboard/create-category",
      },
    ],
  },
  {
    title: "Question",
    icon: <RiProductHuntLine />,
    childrens: [
      {
        title: "Question List",
        icon: <IoColorPaletteOutline />,
        path: "/dashboard/question-list",
      },
      {
        title: "Create Question",
        icon: <FaUnity />,
        path: "/dashboard/create-question",
      },
    ],
  },
  {
    title: "Option",
    icon: <MdSettingsAccessibility />,
    childrens: [
      {
        title: "Option List",
        icon: <IoColorPaletteOutline />,
        path: "/dashboard/option-list",
      },
      {
        title: "Create Option",
        icon: <FaUnity />,
        path: "/dashboard/create-option",
      },
    ],
  },
  {
    title: "Exam",
    icon: <PiExam />,
    childrens: [
      {
        title: "Exam List",
        icon: <IoColorPaletteOutline />,
        path: "/dashboard/exam-list",
      },
      {
        title: "Create Exam",
        icon: <FaUnity />,
        path: "/dashboard/create-exam",
      },
    ],
  },
  {
    title: "User",
    icon: <MdSettingsAccessibility />,
    childrens: [
      {
        title: "User List",
        icon: <IoColorPaletteOutline />,
        path: "/dashboard/user-list",
      },
    ],
  },
];
