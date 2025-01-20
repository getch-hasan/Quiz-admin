import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaEdit, FaList } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { useState } from "react";

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
  const itemsPerPage = 10;

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
    type: "add", // This indicates the page type for the button
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <>
      <PageHeader propsData={propsData} />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search categories"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
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
            {paginatedCategories.map((category) => (
              <tr key={category.id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>{category.name}</td>
                <td>
                  <div className="flex gap-1">
                    <Link to={`/dashboard/edit-category/${category.id}`}>
                      <FaEdit className="text-primary text-xl" />
                    </Link>
                    <MdDelete
                      className="text-red-500 text-xl cursor-pointer"
                      onClick={() => confirmDelete(category.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between mt-5">
        <div>
          <p className="mb-2">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCategories.length)} of{" "}
            {filteredCategories.length}
          </p>
        </div>
        <div>
          <span className="inline-flex border border-[#6c757d] rounded-sm overflow-hidden">
            <button
              className="px-4 py-2 border border-r-[#6c757d] hover:bg-[#6c757d]"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <FaArrowLeft />
            </button>
            {[...Array(totalPages)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                className={`px-4 py-2 border border-r-[#6c757d] ${
                  currentPage === pageIndex + 1 ? "bg-[#6c757d] text-white" : "hover:bg-[#6c757d]"
                }`}
                onClick={() => handlePageChange(pageIndex + 1)}
              >
                {pageIndex + 1}
              </button>
            ))}
            <button
              className="px-4 py-2 border border-r-[#6c757d] hover:bg-[#6c757d]"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <FaArrowRight />
            </button>
          </span>
        </div>
      </div>
    </>
  );
};
