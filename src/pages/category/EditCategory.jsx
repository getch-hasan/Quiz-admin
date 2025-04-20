import React, { useCallback, useEffect, useState } from "react";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { ImageUpload, SingleSelect, TextCheckbox, TextInput } from "../../components/input";
import { FaRegEdit } from "react-icons/fa";
import { networkErrorHandeller, responseChecker } from "../../utils/helpers";
import CategoryFormSkeleton from "../../components/loading/exam-skeleton/examForm-skeleton";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
const EditCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [category, setCategory] = useState({});

  console.log("categorycategory", category);

  const {
    
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    control,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });
  const fetchCategorys = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Category.index();

      if (response && response.status === 200) {
        const result = response.data.data.map((item) => {
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
    fetchCategorys();
  }, [fetchCategorys]);
  // Fetch the category details from the API and populate the form
  const fetchCategory = async (categoryId) => {
    setLoading(true);
    try {
      const response = await NetworkServices.Category.show(categoryId);
      console.log("response", response.data.data);
      if (responseChecker(response, 200)) {
        const category = response?.data?.data;
        setCategory(category);

        setValue("category_name", category.category_name);
        setValue("parent_id", category.parent_id)
        setValue("status", category?.status=== 1 ? true : false);
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
  }, [categoryId]);
  // edit category api
  const onFormSubmit = async (data) => {
    
    const result = data?.status ? "1" : "0";
    const formData = new FormData();
    console.log("object", data);
    data.parent_id && formData.append("parent_id", data.parent_id);
    formData.append("category_name", data.category_name);
    formData.append("status",  result);
    formData.append("_method", "PUT");

    if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail); // Ensure file is uploaded
    }

    try {
      setBtnLoading(true);
      const response = await NetworkServices.Category.update(
        categoryId,
        formData
      );
      console.log("responseresponse", response);

      if (responseChecker(response, 200)) {
        navigate("/dashboard/category");
        return Toastify.Success(" Update Category Successfully");
      }
    } catch (error) {
      networkErrorHandeller(error);
    }finally{
      setBtnLoading(false);
    }
    
  };

  const propsData = {
    pageTitle: "Update Category",
    pageIcon: <FaRegEdit />,
    buttonName: "Category List",
    buttonUrl: "/dashboard/category",
    type: "list",
  };
  if (loading) {
    return (
      <>
        <PageHeaderSkeleton />
        <br />
        <CategoryFormSkeleton />
      </>
    );
  }

  return (
    <>
      <PageHeader propsData={propsData} />

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="mx-auto p-4 border border-gray-200 rounded-lg"
      >
        {/* Categories */}
        <div className="mb-4">
          <SingleSelect
            name="singleSelect"
            control={control}
            options={categories}
            // rules={{ required: "Category selection is required" }}
            onSelected={(selected) =>
              setValue("parent_id", selected?.category_id)
            }
            placeholder={
              categories.find((item) => item?.category_id == category.parent_id)
                ?.category_name ?? "select parent Category"
            }
            error={errors.singleSelect?.message}
            label="Choose parent category "
            isClearable={true}
            // defaultValue="malek "
            // error={errors} // Pass an error message if validation fails
          />
        </div>
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
            onUpload={(file) => setValue("thumbnail", file)}
            imgUrl={category?.thumbnail}
          />
        </div>
        {/* Status (Checkbox) */}

        <div className="flex items-center gap-2  mt-4 ">
          <TextCheckbox
            type="checkbox"
            name="status"
            className="w-5 h-5 "
            control={control}
            onChange={(e) => setValue("status", e.target.checked ? 1 : 0)}
            checked={watch("status") == 1} // If status is 1, checked = true
          />
          <label htmlFor="status" className="text-sm text-gray-700 ">
            Status
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-md transition mt-4 cursor-pointer ${
            btnloading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={btnloading} // Disable button when loading
        >
          {btnloading ? "Loading..." : "Update Category"}
        </button>
      </form>
    </>
  );
};

export default EditCategory;
