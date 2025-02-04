import React, { useCallback, useEffect, useState } from "react";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { MdBrowserUpdated } from "react-icons/md";
import { NetworkServices } from "../../network";
import { networkErrorHandeller, responseChecker } from "../../utils/helper";
import { Toastify } from "../../components/toastify";

const EditCategory = () => {
  const [parentCategories, setParentCategories] = useState([]);
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  // console.log("objectid", categoryId);
  console.log("object", fileSelected);
  console.log("parent", parentCategories);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    watch,
  } = useForm();
  console.log(getValues());

  // Fetch categories from API
  const fetchCategoryParent = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Category.index();

      if (responseChecker(response, 200)) {
        setParentCategories(response?.data?.data || []);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCategoryParent();
  }, [fetchCategoryParent]);

  // Fetch the category details from the API and populate the form
  const fetchCategory = async (categoryId) => {
    setLoading(true);
    try {
      const response = await NetworkServices.Category.show(categoryId);
      // console.log("response", response.data.data);
      if (responseChecker(response, 200)) {
        const category = response?.data?.data;
        // setCategories([category]); // Assume categories is an array
        setValue("category_name", category.category_name);
        setValue("parent_id", category.parent_id);
        setValue("status", category?.status);
      }
    } catch (error) {
      // console.error("Error fetching category:", error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (categoryId) {
      fetchCategory(categoryId);
    }
  }, [categoryId, setValue]);
  // edit category api
  const onFormSubmit = async (data) => {
    const formData = new FormData();

    formData.append("parent_id", data.parent_id);
    formData.append("category_name", data.category_name);
    formData.append("status", data.status);
    formData.append("_method", "PUT");

    if (data.thumbnail && data.thumbnail.length > 0) {
      formData.append("thumbnail", data.thumbnail[0]); // Ensure file is uploaded
    }

    try {
      const response = await NetworkServices.Category.update(
        categoryId,
        formData
      );

      if (responseChecker(response, 200)) {
        navigate("/dashboard/category");
        return Toastify.Success("Category Updated.");
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileSelected(true); // Set to true when a file is selected
    } else {
      setFileSelected(false); // Set to false if no file is selected
    }
  };

  const propsData = {
    pageTitle: "Update Category",
    pageIcon: <MdBrowserUpdated />,
    buttonName: "Category List",
    buttonUrl: "/dashboard/category",
    type: "add",
  };

  return (
    <>
      <PageHeader propsData={propsData} />

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="p-4 shadow-md rounded-md bg-white"
      >
        {/* Thumbnail Upload */}
        <div>
          <div className="flex gap-2">
            <label
              htmlFor="thumbnail"
              className="block text-gray-600 font-medium"
            >
              Thumbnail
            </label>

            {/* If exam has a current thumbnail, show it */}
            {!fileSelected &&
              parentCategories.length > 0 &&
              parentCategories[0].thumbnail && (
                <div className="mb-2">
                  <img
                    src={`${process.env.REACT_APP_API_SERVER}/${parentCategories[0].thumbnail}`}
                    alt="Current Thumbnail"
                    className="w-6 h-6 object-cover rounded-md"
                  />
                </div>
              )}
          </div>

          {/* File input for uploading new thumbnail */}
          <input
            type="file"
            id="thumbnail"
            {...register("thumbnail")}
            onChange={handleFileChange}
            className="w-full p-2  border border-gray-300 rounded-md focus:outline-none"
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
            {parentCategories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category?.category_name}
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
          {loading ? "Loading..." : "Update Category"}
        </button>
      </form>
    </>
  );
};

export default EditCategory;
