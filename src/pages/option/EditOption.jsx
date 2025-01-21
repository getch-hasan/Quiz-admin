import { useForm } from "react-hook-form";
import { IoIosCreate } from "react-icons/io";
import { useState, useEffect } from "react";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { useNavigate, useParams } from "react-router-dom";

export const EditOption = () => {
  const [options, setOptions] = useState([
    { name: "", is_correct: false },
    { name: "", is_correct: false },
    { name: "", is_correct: false },
    { name: "", is_correct: false },
  ]);

  const { id } = useParams(); // Get question ID from URL
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Simulate existing question data
  const existingQuestion = {
    id: "1",
    question_id: "1",
    options: [
      { name: "Option 1", is_correct: true },
      { name: "Option 2", is_correct: false },
      { name: "Option 3", is_correct: false },
      { name: "Option 4", is_correct: false },
    ],
  };

  useEffect(() => {
    if (id) {
      // If editing an existing question, load its data
      if (existingQuestion.id === id) {
        setOptions(existingQuestion.options);
        setValue("question_id", existingQuestion.question_id);
      }
    }
  }, [id, setValue]);

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
      options: options,
      question_id: data.question_id,
    };
    console.log("Options Saved:", payload);
    alert("Options Updated Successfully!");
    navigate("/dashboard/questions");
  };

  const propsData = {
    pageTitle: id ? "Edit Options" : "Create Options",
    pageIcon: <IoIosCreate />,
    buttonName: "Back to Questions",
    buttonUrl: "/dashboard/questions",
    type: id ? "edit" : "create",
  };

  return (
    <>
      <PageHeader propsData={propsData} />
      <form
        className="mx-auto p-4 border border-gray-200 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Question ID</label>
          <input
            type="text"
            {...register("question_id", { required: "Question ID is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          {errors.question_id && (
            <p className="text-red-500 text-sm">{errors.question_id.message}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option, index) => (
            <div key={index}>
              <label className="block text-sm font-medium mb-1">{`Option ${index + 1}`}</label>
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
          {id ? "Update Options" : "Create Options"}
        </button>
      </form>
    </>
  );
};
