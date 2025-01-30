import React, { useCallback, useEffect, useState } from "react";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { IoMdCreate } from "react-icons/io";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("categories", categories);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });

  const fetchCategory = useCallback(async () => {
    setLoading(true); // Start loading
    try {
      const response = await NetworkServices.Category.index();
      if (response && response.status === 200) {
        setCategories(response?.data?.data);
      }
    } catch (error) {
      console.error("Fetch Category Error:", error);
    }
    setLoading(false); // End loading (handled in both success and error)
  }, []);

  // category api fetch
  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const onFormSubmit = async (data) => {
    console.log("data", data);

    const formData = new FormData();

    // Append form fields to FormData object
    formData.append("category_name", data.category_name);
    formData.append("parent_id", data.parent_id);
    formData.append("status", data.status);

    if (data.thumbnail[0]) {
      // Assuming 'thumbnail' field is an array (from react-hook-form file input)
      formData.append("thumbnail", data.thumbnail[0]);
    }
    console.log("object", formData);

    try {
      setLoading(true);
      const response = await NetworkServices.Category.store(formData);
      console.log("objecttt", response);
      if (response && response.status === 200) {
        navigate("/dashboard/category");
        return Toastify.Success("Category Created.");
      }
    } catch (error) {
      console.log("error", error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  };
  const propsData = {
    pageTitle: " Create Category ",
    pageIcon: <IoMdCreate />,
    buttonName: "Category List",
    buttonUrl: "/dashboard/category",
    type: "add", // This indicates the page type for the button
  };
  return (
    <>
      <PageHeader propsData={propsData} />

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="p-4 shadow-md rounded-md bg-white"
      >
        {/* Thumbnail Upload */}
        <div className="mb-4">
          <label
            htmlFor="thumbnail"
            className="block text-gray-600 font-medium"
          >
            Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            {...register("thumbnail")}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.thumbnail.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="parentCategory"
            className="block text-gray-600 font-medium"
          >
            Perent Category
          </label>
          <select
            id="parentCategory"
            {...register("parent_id")}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
          {errors.parent_category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.parent_category.message}
            </p>
          )}
        </div>

        {/* Category Name */}
        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="block text-gray-600 font-medium"
          >
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            {...register("category_name", {
              required: "Category name is required",
            })}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Enter category name"
          />
          {errors.category_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category_name.message}
            </p>
          )}
        </div>
        {/* Status (Checkbox) */}
        <div className="mt-4">
          {/* <label className="flex items-center"> */}
            <input
              type="checkbox"
              id="status"
              {...register("status")}
              className="mr-2"
              value="1"
              checked={watch("status") === 1}
              onChange={(e) => setValue("status", e.target.checked ? 1 : 0)}
            />
            <span className="text-gray-600 font-medium">Status</span>
          {/* </label> */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-md transition mt-4 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Loading..." : "Create Category"}
        </button>
      </form>
    </>
  );
};

export default CreateCategory;
