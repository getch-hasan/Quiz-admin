import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoIosList } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import DataTable from "react-data-table-component";
import { networkErrorHandeller, responseChecker } from "../../utils/helpers";
import ListSkeleton from "../../components/loading/ListSkeleton";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("categories", categories);

  // Fetch categories from API
  const fetchCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Category.index();

      if (responseChecker(response, 200)) {
        setCategories(response?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  // Handle single category deletion
  const destroy = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this category?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await NetworkServices.Category.destroy(id);
              if (response?.status === 200) {
                Toastify.Info("Category deleted successfully.");
                fetchCategory();
              }
            } catch (error) {
              networkErrorHandeller(error);
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };


  const propsData = {
    pageTitle: "Category List",
    pageIcon: <IoIosList />,
    buttonName: "Create New Category",
    buttonUrl: "/dashboard/create-category",
    type: "add",
  };

  const columns = [
    {
      name: "Thumbnail",
      cell: (row) => (
        <img
          className="w-10 h-10 rounded-full border  border-gray-300"
          src={
            row?.thumbnail
              ? `${import.meta.env.VITE_API_SERVER}${row?.thumbnail}`
              : ""
          }
          alt="images"
        />
      ),
    },
    {
      name: "Category Id",
      cell: (row) => row.category_id,
    },
    {
      name: "Category Name",
      cell: (row) => row.category_name,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <Link to={`/dashboard/edit-category/${row?.category_id}`}>
            <FaEdit className="text-primary text-xl" />
          </Link>
          <MdDelete
            className="text-red-500 text-xl cursor-pointer"
            onClick={() => destroy(row?.category_id)}
          />
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
          <DataTable columns={columns} data={categories} pagination />
        </>
      )}
    </>
  );
};
