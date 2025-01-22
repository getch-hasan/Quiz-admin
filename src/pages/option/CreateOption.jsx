import { useForm } from "react-hook-form";
import { IoIosCreate } from "react-icons/io";
import { useState } from "react";
import { PageHeader } from "../../components/PageHeading/PageHeading";

export const CreateOption = () => {
  const [options, setOptions] = useState([
    { name: "", is_correct: false },
    { name: "", is_correct: false },
    { name: "", is_correct: false },
    { name: "", is_correct: false },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleOptionChange = (index, e) => {
    const updatedOptions = [...options];
    updatedOptions[index].name = e.target.value;
    setOptions(updatedOptions);
  };

  const handleCheckboxChange = (index, e) => {
    const updatedOptions = [...options];
    updatedOptions[index].is_correct = e.target.checked;
    setOptions(updatedOptions);
  };

  const onSubmit = (data) => {
    const payload = {
      option: options,
      question_id: data.question_id,
    };
    console.log("Options Saved:", payload);
    alert("Options Created Successfully!");
    // navigate("/dashboard/questions");
  };

  const propsData = {
    pageTitle: "Create New Options",
    pageIcon: <IoIosCreate />,
    buttonName: "Back to Questions",
    buttonUrl: "/dashboard/questions",
    type: "add",
  };

  return (
    <>
      <PageHeader propsData={propsData} />
      <form
        className="mx-auto p-4 border border-gray-200 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Question Name
          </label>
          <input
            type="text"
            {...register("question_id", {
              required: "Question ID is required",
            })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          {errors.question_id && (
            <p className="text-red-500 text-sm">{errors.question_id.message}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option, index) => (
            <div key={index}>
              <label className="block text-sm font-medium mb-1">{`Option ${
                index + 1
              }`}</label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={option.name}
                    onChange={(e) => handleOptionChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
                <div className="w-auto flex items-center">
                  <input
                    type="checkbox"
                    checked={option.is_correct}
                    onChange={(e) => handleCheckboxChange(index, e)}
                    className="mr-2"
                  />
                  <span className="text-sm">Correct Option</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none mt-4"
        >
          Save Options
        </button>
      </form>
    </>
  );
};
