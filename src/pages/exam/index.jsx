import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";

import "react-confirm-alert/src/react-confirm-alert.css";
import Confirmation from "../../components/Confirmation/Confirmation";
import category_image from "../../assets/images/exam_category.png";
import DataTable from "react-data-table-component";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { IoIosList } from "react-icons/io";
import { FaRegFileExcel } from "react-icons/fa";
import { networkErrorHandeller } from "../../utils/helpers";
import ListSkeleton from "../../components/loading/ListSkeleton";
const ExamList = () => {
  const [exam, setExam] = useState([]);
  const [loading, setLoading] = useState(false);
  // Fetch categories from API
  const fetchExam = useCallback(async () => {
    try {
      setLoading(true);
      const response = await NetworkServices.Exam.index();

      if (response?.status === 200) {
        setExam(response?.data?.data || []);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchExam();
  }, []);

  console.log("exam", exam);

  const destroy = (id) => {
    const dialog = Confirmation({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this category?",
      onConfirm: async () => {
        try {
          const response = await NetworkServices.Exam.destroy(id);
          if (response?.status === 200) {
            Toastify.Info("Exam deleted successfully.");
            fetchExam();
          }
        } catch (error) {
          networkErrorHandeller(error);
        }
      },
    });

    dialog.showDialog();
  };
  // if (loading) {
  //   return (
  //     <div className="space-y-5">
  //       <PageHeaderSkeleton />
  //       <SkeletonTable />
  //     </div>
  //   );
  // }
  const propsData = {
    pageTitle: "Exam List",
    pageIcon: <IoIosList />,
    buttonName: "Create New Exam",
    buttonUrl: "/dashboard/create-exam",
    type: "add",
  };
  const columns = [
    {
      name: "Thumbnail",
      cell: (row) => (
        <img
          className="w-10 h-10 rounded-full border"
          src={`${import.meta.env.VITE_API_SERVER}${row?.thumbnail}`}
          alt="images"
        />
      ),
    },
    {
      name: "Exam Name",

      cell: (row) => <span>{row?.exam_name}</span>,
    },
    {
      name: "Status",
      cell: (row) => <span>{row?.total_questions}</span>,
    },
    {
      name: "Created At",
      cell: (row) => <span>{row?.total_marks}</span>,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center">
          <Link to={`/dashboard/edit-exam/${row?.exam_id}`}>
            <FaEdit className="text-primary text-xl" />
          </Link>
          <MdDelete
            className="text-red-500 text-xl cursor-pointer"
            onClick={() => destroy(row?.exam_id)}
          />

          <Link to={`/dashboard/create-excel-exam/${row?.exam_id}`}>
            <FaRegFileExcel className="text-blue-500 text-xl cursor-pointer" />
          </Link>
        </div>
      ),
    },
  ];
  return (
    <>

      {loading ? (
        <ListSkeleton />
      ) : (
        <>
          <PageHeader propsData={propsData} />

          <DataTable columns={columns} data={exam} pagination />
        </>
      )}
    </>
  );
};
export default ExamList;
