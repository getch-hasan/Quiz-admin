import React, { useCallback, useEffect, useState } from "react";
import { NetworkServices } from "../../network";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { FaPlus } from "react-icons/fa6";
import Confirmation from "../../components/Confirmation/Confirmation";
import { Toastify } from "../../components/toastify";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosList } from "react-icons/io";
import { networkErrorHandeller } from "../../utils/helpers";

const Testimonial = () => {
  const [testimonial, setTestimonial] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("testimonial",testimonial)

  const fetchTestimonial = useCallback(async () => {
    try {
      setLoading(true);
      const response = await NetworkServices.Testimonial.index();
      console.log("first",response)
      if (response?.status === 200) {
        setTestimonial(response?.data?.data || []);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTestimonial();
  }, [fetchTestimonial]);

  if (loading) {
    return (
      <div className="space-y-5">
        <PageHeaderSkeleton />
        <SkeletonTable />
      </div>
    );
  }

    const propsData = {
      pageTitle: "Testimonial List",
      pageIcon: <IoIosList />,
      buttonName: "Create New Testimonial",
      buttonUrl: "/dashboard/create-testimonial",
      type: "add",
    };

    const destroy = (id) => {
        const dialog = Confirmation({
          title: "Confirm Delete",
          message: "Are you sure you want to delete this category?",
          onConfirm: async () => {
            try {
              const response = await NetworkServices.Testimonial.destroy(id);
              if (response?.status === 200) {
                Toastify.Info("Exam deleted successfully.");
                fetchTestimonial();
              }
            } catch (error) {
              networkErrorHandeller(error);
            }
          },
        });
    
        dialog.showDialog();
      };

    const columns = [

        {
          name: "Thumbnail",
          cell: (row) => (
            <img
              className="w-10 h-10 rounded-full border"
              src={
                row?.pic
                  ? `${import.meta.env.VITE_API_SERVER}${row?.pic}`
                  : ""
              }
              alt="images"
            />
          ),
        },
        {
          name: "Name",
          
          cell: (row) => <span>{row?.name}</span>,
        },
        {
          name: "Designation",
          cell: (row) => <span>{row?.designation}</span>,
        },
        {
          name: "Comment",
          cell: (row) => <span>{row?.comment}</span>,
        },
        {
          name: "Action",
          cell: (row) => (
            <div className="flex items-center">
              <Link to={`/dashboard/edit-testimonial/${row?.testimonial_id}`}>
                <FaEdit className="text-primary text-xl" />
              </Link>
              <MdDelete
                className="text-red-500 text-xl cursor-pointer"
                onClick={() => destroy(row?.testimonial_id
                )}
              />
            </div>
          ),
        },
      ]; 

  return (
    <>
    <PageHeader propsData={propsData} />
    <DataTable
    columns={columns}
    data={testimonial}
    // selectableRows
    // selectableRowsComponent="input"
    // onSelectedRowsChange={({ selectedRows }) => {
    //   console.log(selectedRows);
    //   setExamSelected(selectedRows)
    // }}
    pagination
  />
  </>
  )
};

export default Testimonial;
