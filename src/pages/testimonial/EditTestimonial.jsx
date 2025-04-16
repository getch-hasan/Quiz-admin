import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { ImageUpload, SingleSelect, TextAreaInput, TextCheckbox, TextInput } from "../../components/input";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { FaRegEdit } from "react-icons/fa";
import { networkErrorHandeller } from "../../utils/helpers";

const EditTestimonial = () => {
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      thumbnail: "",
      designation: null,
      rating: null,
      comment: "",
      status: 0,
    },
  });

  useEffect(() => {
    if (id) {
      fetchTestimonial(id);
    }
  }, [id]);

  useEffect(() => {
    if (testimonial) {
      setValue("name", testimonial?.name);
      // setValue("thumbnail", testimonial?.pic);
      setValue("designation", { label: testimonial.designation, value: testimonial.designation });
      setValue("rating", { label: testimonial.rating.toString(), value: testimonial.rating });
      setValue("comment", testimonial.comment);
      setValue("status", testimonial.status === 1 ? 1 : 0);
    }
  }, [testimonial, setValue]);

  const fetchTestimonial = async (id) => {
    try {
      const response = await NetworkServices.Testimonial.show(id);
      if (response && response.status === 200) {
        setTestimonial(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching testimonial:", error);
    }
  };

  const onFormSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("pic", data.thumbnail);
      formData.append("designation", data?.designation?.value);
      formData.append("comment", data?.comment);
      formData.append("rating", data?.rating?.value);
      formData.append("status",data?.status ? 1 : 0);
      formData.append("_method", "PUT");

 

      const response = await NetworkServices.Testimonial.update(id, formData);
      if (response && response.status === 200) {
        Toastify.Success("Testimonial Updated.");
        navigate("/dashboard/testimonial-list");
      }
    } catch (error) {
      console.error("Error:", error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  };
  const propsData = {
    pageTitle: "Update Testimonial",
    pageIcon: <FaRegEdit />,
    buttonName: "Testimonial List",
    buttonUrl: "/dashboard/testimonial-list",
    type: "list",
  };

  return (
    <>
    <PageHeader propsData={propsData} />
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="p-4 shadow-md rounded-md bg-white"
    >
      <TextInput
        name="name"
        control={control}
        label="Testimonial Name *"
        placeholder="Enter your testimonial name"
        rules={{ required: "Testimonial Name is required" }}
        error={errors?.name?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SingleSelect
          name="designation"
          control={control}
          options={[
            { label: "Student", value: "student" },
            { label: "Teacher", value: "teacher" },
            { label: "Admin", value: "admin" },
          ]}
          error={errors.designation?.message}
          label="Choose Designation *"
          isClearable={true}
        />

        <SingleSelect
          name="rating"
          control={control}
          options={Array.from({ length: 5 }, (_, i) => ({
            label: (i + 1).toString(),
            value: i + 1,
          }))}
          error={errors.rating?.message}
          label="Choose Rating *"
          isClearable={true}
        />
      </div>

      <TextAreaInput
        name="comment"
        control={control}
        label="Comment *"
        placeholder="Enter your comment"
        error={errors?.comment?.message}
      />

      <ImageUpload
        name="thumbnail"
        control={control}
        label="Category Picture"
        onUpload={(file) => setValue("pic", file)}
       
        imgUrl={testimonial?.pic || ""}
        error={errors?.thumbnail?.message}
        
      />

      <div className="flex items-center mt-4">
        <TextCheckbox
          type="checkbox"
          name="status"
          control={control}
          onChange={(e) => setValue("status", e.target.checked ? 1 : 0)}
          checked={watch("status") === 1}
        />
        <label htmlFor="status" className="text-sm text-gray-700 ml-2">
          Status
        </label>
      </div>

      <button
        type="submit"
        className={`mt-4 px-4 py-2 text-white rounded-md transition ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Loading..." : "Update Testimonial"}
      </button>
    </form>
    </>
  );
};

export default EditTestimonial;
