import { useCallback, useEffect, useState } from "react";
import { FaEdit, FaList, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { Link } from "react-router-dom";
import { NetworkServices } from "../../network";
import { networkErrorHandeller, responseChecker } from "../../utils/helper";
import { Toastify } from "../../components/toastify";
import Confirmation from "../../components/Confirmation/Confirmation";
import DataTable from "react-data-table-component";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";

export const OptionList = () => {
  const [option, setOption] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Options from API
  const fetchOption = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Option.index();
      console.log(response);
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
  if (loading) {
    return (
      <div>
        <PageHeaderSkeleton />
        <SkeletonTable />
      </div>
    );
  }
  const propsData = {
    pageTitle: "Option List",
    pageIcon: <FaList />,
    buttonName: "Create New Option",
    buttonUrl: "/dashboard/create-option",
    type: "add",
  };
  const columns = [
    {
      name: "Question Name",
      cell: (row) => row?.question?.question,
    },
    {
      name: "Option Name",
      cell: (row) => row?.option,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="flex gap-2">
            <Link to={`/dashboard/edit-option/${row.option_id}`}>
              <FaEdit className="text-primary text-xl" />
            </Link>
            <button onClick={() => destroy(row.option_id)}>
              <MdDelete className="text-red-500 text-xl" />
            </button>
          </div>
        );
      },
      sortable: false,
      width: "10%",
      className: "text-center",
      fixed: "right",
    },
  ];
  return (
    <>
      <PageHeader propsData={propsData} />
      <DataTable columns={columns} data={option} pagination />
    </>
  );
};
