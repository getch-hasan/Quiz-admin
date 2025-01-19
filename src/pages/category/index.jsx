import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaList } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { useState } from "react";

export const CategoryList = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Science" },
    { id: 2, name: "Math" },
    { id: 3, name: "History" },
  ]);
  /**  Confirm delete dialog */
  // const confirmDelete = (id) => {
  //   confirmAlert({
  //     title: "Confirm to delete",
  //     message: "Are you sure you want to delete this client?",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => destroy(id),
  //       },
  //       {
  //         label: "No",
  //         onClick: () => {},
  //       },
  //     ],
  //   });
  // };

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

  return (
    <>
      <PageHeader propsData={propsData}/>
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
            {/* Map through categories */}
            {categories.map((category) => (
              <tr key={category.id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>{category.name}</td>
                <td>
                  <div className="flex gap-1">
                    {/* Edit Button */}
                    <Link to={`/dashboard/edit-category/${category.id}`}>
                      <FaEdit className="text-primary text-xl" />
                    </Link>

                    {/* Delete Button */}
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
    </>
  );
};
