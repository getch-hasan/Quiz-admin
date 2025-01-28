import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller, responseChecker } from "../../utils/helper";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Confirmation from "../../components/Confirmation/Confirmation";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const itemsPerPage = 10;

  console.log("categories", categories);

  // Debounced search
  useEffect(() => {
    setLoading(true); // Start loading
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setLoading(false); // Stop loading
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch categories from API
  const fetchCategory = useCallback(async () => {
    try {
      const response = await NetworkServices.Category.index();
      console.log(response);
      if (responseChecker(response, 200)) {
        setCategories(response?.data?.data || []);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  }, []);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  // Handle single category deletion
  // const destroy = (id) => {
  //   confirmAlert({
  //     title: "Confirm Delete",
  //     message: "Are you sure you want to delete this category?",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: async () => {
  //           try {
  //             const response = await NetworkServices.Category.destroy(id);
  //             if (response?.status === 200) {
  //               Toastify.Info("Category deleted successfully.");
  //               fetchCategory();
  //             }
  //           } catch (error) {
  //             networkErrorHandeller(error);
  //           }
  //         },
  //       },
  //       {
  //         label: "No",
  //       },
  //     ],
  //   });
  // };

  const destroy = (id) => {
    const dialog = Confirmation({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this category?",
      onConfirm: async () => {
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
    });

    dialog.showDialog();
  };

  // Handle multiple categories deletion

  const handleMultipleDelete = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete the selected categories?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await NetworkServices.Category.bulkDestroy({
                ids: selectedCategories,
              });
              Toastify.Info("Selected categories deleted.");
              fetchCategory();
              setSelectedCategories([]);
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

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 4;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      // Add initial pages or ellipsis
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      // Add visible pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ending pages or ellipsis
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Filter categories based on the search term
  const filteredCategories = categories.filter((category) =>
    category?.category_name
      ?.toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((categoryId) => categoryId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedCategories(paginatedCategories.map((cat) => cat.category_id));
    } else {
      setSelectedCategories([]);
    }
  };

  const propsData = {
    pageTitle: "Category List",
    pageIcon: <FaPlus />,
    buttonName: "Create New Category",
    buttonUrl: "/dashboard/create-category",
    type: "add",
  };

  return (
    <>
      <PageHeader propsData={propsData} />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search categories"
          className="border w-full border-gray-300 focus:border-blue-400 focus:border-[3px] p-2 rounded outline-none h-[38px]"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        {selectedCategories.length > 0 && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleMultipleDelete}
          >
            Delete Selected
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={
                      paginatedCategories.length > 0 &&
                      selectedCategories.length === paginatedCategories.length
                    }
                  />
                </label>
              </th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Show loading spinner or text when loading
              <tr>
                <td colSpan="3" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : paginatedCategories.length > 0 ? (
              // Map over categories if they exist
              paginatedCategories.map((category) => (
                <tr key={category.category_id}>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={() =>
                          handleCheckboxChange(category.category_id)
                        }
                        checked={selectedCategories.includes(
                          category.category_id
                        )}
                      />
                    </label>
                  </td>
                  <td>{category.category_name}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        to={`/dashboard/edit-category/${category?.category_id}`}
                      >
                        <FaEdit className="text-primary text-xl" />
                      </Link>
                      <MdDelete
                        className="text-red-500 text-xl cursor-pointer"
                        onClick={() => destroy(category?.category_id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              // Show "No categories found" when not loading and no categories
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}

      <div className="flex flex-wrap items-center justify-between mt-5">
        <div>
          <p className="mb-2">
            Showing {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, filteredCategories.length)} of{" "}
            {filteredCategories.length}
          </p>
        </div>
        <div>
          <span className="inline-flex border border-[#6c757d] rounded-sm overflow-hidden">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-r-[#6c757d]"
            >
              <FaArrowLeft />
            </button>

            {/* Dynamic Page Numbers */}
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span
                  key={index}
                  className="px-4 py-2 border border-r-[#6c757d]"
                >
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 border border-r-[#6c757d] ${
                    page === currentPage
                      ? "bg-gray-700 text-white"
                      : "hover:bg-[#6c757d]"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            {/* Next Button */}
            <button
              className="px-4 py-2 border border-r-[#6c757d] hover:bg-[#6c757d]"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaArrowRight />
            </button>
          </span>
        </div>
      </div>
    </>
  );
};
