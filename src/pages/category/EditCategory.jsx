import React, { useCallback, useEffect, useState } from "react";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { MdBrowserUpdated } from "react-icons/md";
import { NetworkServices } from "../../network";
import { networkErrorHandeller, responseChecker } from "../../utils/helper";
import { Toastify } from "../../components/toastify";
import { ImageUpload, TextInput } from "../../components/input";

const EditCategory = () => {
  
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  // console.log("objectid", categoryId);
 

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    watch,
    control,
  } = useForm();
  console.log(getValues());


  // Fetch the category details from the API and populate the form
  const fetchCategory = async (categoryId) => {
    setLoading(true);
    try {
      const response = await NetworkServices.Category.show(categoryId);
      console.log("response", response.data.data);
      if (responseChecker(response, 200)) {
        const category = response?.data?.data;
        console.log("category", category);
        // setCategories([category]); // Assume categories is an array
        setValue("category_name", category.category_name);
        setValue("thumbnail", category?.thumbnail);
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
        className="mx-auto p-4 border border-gray-200 rounded-lg"
      >
        {/* Total Questions */}
        <div>
          <TextInput
            name="category_name"
            control={control}
            label="Category *"
            type="text"
            placeholder="Create Category"
            rules={{ required: "Category is required" }} // Validation rule
            error={errors.category_name?.message} // Show error message
          />
        </div>

        {/* Thumbnail Upload */}
        <div className="mt-4 cursor-pointer">
          <ImageUpload
            name="thumbnail"
            control={control}
            label="Category Picture"
            required
            onUpload={(file) => setValue("thumbnail", file)}
          />
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

export default EditCategory;
