import { useCallback, useEffect, useState } from "react";
import { FaEdit, FaList, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { Link } from "react-router-dom";
import { NetworkServices } from "../../network";
import { networkErrorHandeller, responseChecker } from "../../utils/helper";
import { Toastify } from "../../components/toastify";
import Confirmation from "../../components/Confirmation/Confirmation";

export const OptionList = () => {
  const [option, setOption] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  // Fetch Options from API
  const fetchOption = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Option.index();
      if (responseChecker(response, 200)) {
        setOption(response?.data?.data || []);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOption();
  }, [fetchOption]);

  // Pagination Calculation
  const totalPages = Math.ceil(option.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOptions = option.slice(startIndex, startIndex + itemsPerPage);

  // Handle Page Change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Generate Page Numbers
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
// delete option
    const destroy = (id) => {
      const dialog = Confirmation({
        title: "Confirm Delete",
        message: "Are you sure you want to delete this category?",
        onConfirm: async () => {
          try {
            const response = await NetworkServices.Option.destroy(id);
            if (response?.status === 200) {
              Toastify.Info("Option deleted successfully.");
              fetchOption();
            }
          } catch (error) {
            networkErrorHandeller(error);
          }
        },
      });

      dialog.showDialog();
    };

  const propsData = {
    pageTitle: "Option List",
    pageIcon: <FaList />,
    buttonName: "Create New Option",
    buttonUrl: "/dashboard/create-option",
    type: "add",
  };

  return (
    <>
      <PageHeader propsData={propsData} />

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead>
            <tr>
              <th>Option</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="2" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : currentOptions.length > 0 ? (
              currentOptions.map((aoption) => (
                <tr key={aoption.id}>
                  <td>{aoption.option}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link to={`/dashboard/edit-option/${aoption.option_id}`}>
                        <FaEdit className="text-primary text-xl" />
                      </Link>
                      <button onClick={() => destroy(aoption.option_id)}>
                        <MdDelete className="text-red-500 text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4">
                  No options found.
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
            Showing {startIndex + 1}-{" "}
            {Math.min(startIndex + itemsPerPage, option.length)} of{" "}
            {option.length}
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
