import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import { MdDelete } from "react-icons/md";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { useCallback, useEffect, useState } from "react";
import { NetworkServices } from "../../network";

export const UserList = () => {
  const [users, setUsers] = useState([
        {
          id: 1,
          image: "https://example.com/images/image1.jpg",
          name: "LLLLL",
          email: "johndoe@example.com",
          phone: "+1 555-1234",
        },
        {
          id: 2,
          image: "https://example.com/images/image2.jpg",
          name: "Jane Smith",
          email: "janesmith@example.com",
          phone: "+1 555-5678",
        },
        {
          id: 3,
          image: "https://example.com/images/image3.jpg",
          name: "Alex Johnson",
          email: "alexjohnson@example.com",
          phone: "+1 555-8765",
        },
        {
          id: 4,
          image: "https://example.com/images/image4.jpg",
          name: "Emily Davis",
          email: "emilydavis@example.com",
          phone: "+1 555-4321",
        },
        {
          id: 5,
          image: "https://example.com/images/image5.jpg",
          name: "Michael Brown",
          email: "michaelbrown@example.com",
          phone: "+1 555-1357",
        },
        {
          id: 6,
          image: "https://example.com/images/image6.jpg",
          name: "Sarah Wilson",
          email: "sarahwilson@example.com",
          phone: "+1 555-2468",
        },
        {
          id: 7,
          image: "https://example.com/images/image7.jpg",
          name: "David Moore",
          email: "davidmoore@example.com",
          phone: "+1 555-3579",
        },
        {
          id: 8,
          image: "https://example.com/images/image8.jpg",
          name: "Olivia Taylor",
          email: "oliviataylor@example.com",
          phone: "+1 555-4680",
        },
        {
          id: 9,
          image: "https://example.com/images/image9.jpg",
          name: "William Anderson",
          email: "williamanderson@example.com",
          phone: "+1 555-5791",
        },
        {
          id: 10,
          image: "https://example.com/images/image10.jpg",
          name: "John Doe",
          email: "sophiathomas@example.com",
          phone: "+1 555-6802",
        },
        {
          id: 11,
          image: "https://example.com/images/image11.jpg",
          name: "John Doe",
          email: "jamesjackson@example.com",
          phone: "+1 555-7913",
        },
        {
          id: 12,
          image: "https://example.com/images/image12.jpg",
          name: "John Doe",
          email: "miawhite@example.com",
          phone: "+1 555-8024",
        },
        {
          id: 13,
          image: "https://example.com/images/image13.jpg",
          name: "John Doe",
          email: "benjaminharris@example.com",
          phone: "+1 555-9135",
        },
        {
          id: 14,
          image: "https://example.com/images/image14.jpg",
          name: "John Doe",
          email: "isabellaclark@example.com",
          phone: "+1 555-0246",
        },
        {
          id: 15,
          image: "https://example.com/images/image15.jpg",
          name: "John Doe",
          email: "ethanlewis@example.com",
          phone: "+1 555-1358",
        },
        {
          id: 16,
          image: "https://example.com/images/image16.jpg",
          name: "John Doe",
          email: "charlotteyoung@example.com",
          phone: "+1 555-2469",
        },
        {
          id: 17,
          image: "https://example.com/images/image17.jpg",
          name: "John Doe",
          email: "danielwalker@example.com",
          phone: "+1 555-3570",
        },
        {
          id: 18,
          image: "https://example.com/images/image18.jpg",
          name: "John Doe",
          email: "ameliaking@example.com",
          phone: "+1 555-4681",
        },
        {
          id: 19,
          image: "https://example.com/images/image19.jpg",
          name: "John Doe",
          email: "henryscott@example.com",
          phone: "+1 555-5792",
        },
        {
          id: 20,
          image: "https://example.com/images/image20.jpg",
          name: "John Doe",
          email: "zoeadams@example.com",
          phone: "+1 555-6803",
        },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [nameSearch, setNameSearch] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const [phoneSearch, setPhoneSearch] = useState("");
  // const [user, setUser] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState({
    nameSearch,
    emailSearch,
    phoneSearch,
  });
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;
  const propsData = {
    pageTitle: "User List",
    pageIcon: <FaPlus />,
    buttonName: "Add New User",
    buttonUrl: "/dashboard/user/create",
    type: "add",
  };

  // const fetchCategory = useCallback(async () => {
  //   setLoading(true); // Start loading
  //   try {
  //     const response = await NetworkServices.Authentication.index();

  //     if (response && response.status === 200) {
  //       setUser(response?.data?.data);
  //     }
  //   } catch (error) {
  //     console.error("Fetch Category Error:", error);
  //   }
  //   setLoading(false); // End loading (handled in both success and error)
  // }, []);

  // // category api fetch
  // useEffect(() => {
  //   fetchCategory();
  // }, [fetchCategory]);

  // Update `debouncedSearchTerm` after 1000ms
  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(() => {
      setDebouncedSearchTerm({ nameSearch, emailSearch, phoneSearch });
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(handler); // Clear the timeout if search terms change
    };
  }, [nameSearch, emailSearch, phoneSearch]);

  // Filter users based on name, email, and phone search criteria
  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(debouncedSearchTerm.nameSearch.toLowerCase()) &&
      user.email
        .toLowerCase()
        .includes(debouncedSearchTerm.emailSearch.toLowerCase()) &&
      user.phone.includes(debouncedSearchTerm.phoneSearch)
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 1) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = 1; i <= maxVisiblePages; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <>
      <PageHeader propsData={propsData} />
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border w-full border-gray-300 focus:border-blue-400  focus:border-[3px] p-2 rounded outline-none h-[38px]"
          value={nameSearch}
          onChange={(e) => {
            setNameSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <input
          type="text"
          placeholder="Search by email"
          className="border w-full border-gray-300 focus:border-blue-400  focus:border-[3px] p-2 rounded outline-none h-[38px]"
          value={emailSearch}
          onChange={(e) => {
            setEmailSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <input
          type="text"
          placeholder="Search by phone number"
          className="border w-full border-gray-300 focus:border-blue-400  focus:border-[3px] p-2 rounded outline-none h-[38px]"
          value={phoneSearch}
          onChange={(e) => {
            setPhoneSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-4">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-200">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length === 0 && !loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No items found
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-12 h-12 rounded-full"
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <div className="flex gap-2">
                        {/* <Link to={`/dashboard/edit-user/${user.id}`}>
                          <FaEdit className="text-primary text-xl" />
                        </Link> */}
                        <MdDelete
                          className="text-red-500 text-xl cursor-pointer"
                          onClick={() => confirmDelete(user.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between mt-5">
        <div>
          <p className="mb-2">
            Showing {startIndex + 1}-{" "}
            {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length}
          </p>
        </div>
        <div>
          <span className="inline-flex border border-[#6c757d] rounded-sm overflow-hidden">
            <button
              className="px-4 py-2 border border-r-[#6c757d] hover:bg-[#6c757d]"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaArrowLeft />
            </button>
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
