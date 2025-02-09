import React, { useState } from "react";
import {
  ImageUpload,
  SingleSelect,
  TextAreaInput,
  TextCheckbox,
  TextInput,
} from "../../components/input";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { useNavigate } from "react-router-dom";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { IoMdCreate } from "react-icons/io";

const CreateTestimonial = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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

  const onFormSubmit = async (data) => {
    try {
      setLoading(true);
  
      
      const formData = {
        name: data?.name,
        pic: data?.thumbnail,
        designation: data?.designation?.value, 
        comment: data?.comment,
        rating: parseInt(data?.rating?.value, 10),
        status: data?.status ? 1 : 0, 
      };
      console.log("formData",formData)
  
      const response = await NetworkServices.Testimonial.store(formData);
  
      if (response && response.status === 200) {
        navigate("/dashboard/testimonial-list");
        return Toastify.Success("Testimonial Created.");
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  };
    const propsData = {
      pageTitle: " Create Testimonial ",
      pageIcon: <IoMdCreate />,
      buttonName: "Testimonial List",
      buttonUrl: "/dashboard/testimonial-list",
      type: "list", // This indicates the page type for the button
    };
  
  return (
    <div>
        <PageHeader propsData={propsData} />
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="p-4 shadow-md rounded-md bg-white"
      >
        {/* Exam Name */}
        <div className="mb-4">
          <TextInput
            name="name"
            control={control}
            label="Testimonial Name *"
            placeholder="Enter your testimonial name"
            rules={{ required: "Exam Name is required" }} // Validation rule
            error={errors?.name?.message} // Show error message
          />
        </div>

        {/* Grid Layout for Additional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* designation */}
          <div className="mb-4">
            <SingleSelect
              name="designation"
              control={control}
              options={[
                { label: "Student", value: "student" },
                { label: "Teacher", value: "teacher" },
                { label: "Admin", value: "admin" },
              ]}
              onSelected={(selected) =>
                setValue("designation_value", selected?.value)
              }
              placeholder="Select a Designation *"
              error={errors.designation?.message}
              label="Choose Designation *"
              isClearable={true}
            />
          </div>

          {/* rating */}
          {/* rating */}
          <div className="mb-4">
            <SingleSelect
              name="rating"
              control={control}
              options={[
                { label: 1, value: 1 },
                { label: 2, value: 2 },
                { label: 3, value: 3 },
                { label: 4, value: 4 },
                { label: 5, value: 5 },
              ]}
              onSelected={(selected) =>
                setValue("rating_value", selected?.value)
              }
              placeholder="Select a Rating *"
              error={errors.rating?.message}
              label="Choose Rating *"
              isClearable={true}
            />
          </div>
        </div>
        <div className="mb-4">
          <TextAreaInput
            name="comment"
            control={control}
            label="Comment *"
            placeholder="Enter your Comment"
            error={errors?.comment?.message} // Show error message
            isClearable={true}
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
        <div className="flex items-center  mt-4 ">
          <TextCheckbox
            type="checkbox"
            name="status"
            className=""
            control={control}
            onChange={(e) => setValue("status", e.target.checked ? 1 : 0)}
            checked={watch("status") == 1} // If status is 1, checked = true
          />
          <label htmlFor="status" className="text-sm text-gray-700">
            Status
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`mt-4 px-4 py-2 text-white rounded-md transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Loading..." : "Create Testimonal"}
        </button>
      </form>
    </div>
  );
};

export default CreateTestimonial;
