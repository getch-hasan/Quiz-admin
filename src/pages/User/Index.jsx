import { MdDelete } from "react-icons/md";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { useCallback, useEffect, useState } from "react";
import { NetworkServices } from "../../network";
import DataTable from "react-data-table-component";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { Toastify } from "../../components/toastify";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoIosList } from "react-icons/io";
import { networkErrorHandeller } from "../../utils/helpers";
import ListSkeleton from "../../components/loading/ListSkeleton";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchUser = useCallback(async () => {
    setLoading(true); // Start loading
    try {
      const response = await NetworkServices.Authentication.index();
      if (response && response.status === 200) {
        setUsers(response?.data.data);
      }
    } catch (error) {
      console.error("Fetch Category Error:", error);
    }
    setLoading(false); // End loading (handled in both success and error)
  }, []);

  // category api fetch
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Handle single user deletion
  const destroy = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this User",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            console.log("id", id);
            try {
              const response = await NetworkServices.Authentication.destroy(id);
              if (response?.status === 200) {
                Toastify.Info("User deleted successfully.");
                fetchUser();
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
    pageTitle: "User List",
    pageIcon: <IoIosList />,
    type: "add",
  };

  const columns = [
    {
      name: "User Name",
      cell: (row) => row?.name,
    },
    {
      name: "User Email",
      cell: (row) => row?.email,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <Link to={`/dashboard/user-show/${row?.id}`}>
            <MdOutlineRemoveRedEye className="text-primary text-xl" />
          </Link>
          {/* 
          <MdDelete
            className="text-red-500 text-xl cursor-pointer"
            onClick={() => destroy(row?.id)}
          /> */}
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
      <DataTable columns={columns} data={users} pagination />
        </>
      )}

    </>
  );
};
