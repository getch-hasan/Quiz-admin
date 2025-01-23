import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaEdit, FaList } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { useEffect, useState } from "react";

export const CategoryList = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Science" },
    { id: 2, name: "Math" },
    { id: 3, name: "History" },
    { id: 4, name: "Geography" },
    { id: 5, name: "English" },
    { id: 6, name: "Physics" },
    { id: 7, name: "Chemistry" },
    { id: 8, name: "Biology" },
    { id: 9, name: "Computer Science" },
    { id: 10, name: "Arts" },
    { id: 11, name: "Sports" },
    { id: 12, name: "Politics" },
    { id: 13, name: "Economics" },
    { id: 14, name: "Music" },
    { id: 15, name: "Dance" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const itemsPerPage = 10;

  // Update `debouncedSearchTerm` after 1000ms
  useEffect(() => {
    setLoading(true); 
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(handler); // Clear the timeout if `searchTerm` changes
    };
  }, [searchTerm]);

  /** Delete a category */
  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  const propsData = {
    pageTitle: "Category List",
    pageIcon: <FaList />,
    buttonName: "Create New Category",
    buttonUrl: "/dashboard/task/create",
    type: "add",
  };

  // Filter categories based on the debounced search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Function to generate dynamic page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 1) {
      // Show all pages if total pages are less than or equal to 6
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first 5 pages, ellipsis, and last page
      for (let i = 1; i <= maxVisiblePages; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <>
      <PageHeader propsData={propsData} />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search categories"
          className="border w-full border-gray-300 focus:border-blue-400  focus:border-[3px] p-2 rounded outline-none h-[38px]"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to the first page on search
          }}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : paginatedCategories.length > 0 ? (
              paginatedCategories.map((category) => (
                <tr key={category.id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>{category.name}</td>
                  <td>
                    <div className="flex gap-1">
                      <Link to={`/dashboard/edit-question/${category.id}`}>
                        <FaEdit className="text-primary text-xl" />
                      </Link>
                      <MdDelete
                        className="text-red-500 text-xl cursor-pointer"
                        onClick={() => confirmDelete(category.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
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
            {/* Previous button */}
            <button
              className="px-4 py-2 border border-r-[#6c757d] hover:bg-[#6c757d]"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaArrowLeft />
            </button>
            {/* Dynamic page numbers */}
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
                  className={`px-4 py-2 border border-r-[#6c757d] ${
                    currentPage === page
                      ? "bg-[#6c757d] text-white"
                      : "hover:bg-[#6c757d]"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              )
            )}
            {/* Next button */}
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
