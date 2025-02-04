import React, { useCallback, useEffect, useState } from "react";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { IoMdCreate } from "react-icons/io";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import { SkeletonForm } from "../../components/loading/skeleton-table";
import { ImageUpload, SingleSelect, TextInput } from "../../components/input";

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
    control,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });


  const fetchCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Category.index();

      if (response && response.status === 200) {
        const result = response.data.data.map((item, index) => {
          return {
            label: item.category_name,
            value: item.category_name,
            ...item,
          };
        });
        setCategories(result);
      }
    } catch (error) {
      console.error("Fetch Category Error:", error);
    }
    setLoading(false); // End loading (handled in both success and error)
  }, []);

  // category api fetch
  useEffect(() => {
    fetchCategory();
  }, []);

  const onFormSubmit = async (data) => {
    console.log("data", data);


    try {
      setLoading(true);
      const response = await NetworkServices.Category.store(data);
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

  if (loading) {
    return (
      <div className="text-center">
        {" "}
        <PageHeaderSkeleton />
        <br />
        <SkeletonForm />{" "}
      </div>
    );
  }
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
        className="mx-auto p-4 border border-gray-200 rounded-lg"
      >
        <div className="mb-4">
          <SingleSelect
            name="singleSelect"
            control={control}
            options={categories}
            rules={{ required: "Category selection is required" }}
            onSelected={(selected) =>
              setValue("category_id", selected?.category_id)
            }
            placeholder="Select a category "
            error={errors.singleSelect?.message}
            label="Choose a category *"
            isClearable={true}
            // error={errors} // Pass an error message if validation fails
          />
        </div>

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

export default CreateCategory;
