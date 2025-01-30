import { useForm } from "react-hook-form";
import { IoIosCreate } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { NetworkServices } from "../../network";
import { networkErrorHandeller, responseChecker } from "../../utils/helper";
import {  useNavigate } from "react-router-dom";
import { Toastify } from "../../components/toastify";

export const CreateOption = () => {
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([
    { name: "", is_correct: 0 },
    { name: "", is_correct: 0 },
    { name: "", is_correct: 0 },
    { name: "", is_correct: 0 },
  ]);



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate =useNavigate()

  const handleOptionChange = (index, e) => {
    const updatedOptions = [...options];
    updatedOptions[index].name = e.target.value;
    setOptions(updatedOptions);
  };

  const handleCheckboxChange = (index, e) => {
    const updatedOptions = [...options];
    updatedOptions[index].is_correct = e.target.checked ? 1 : 0;
    setOptions(updatedOptions);
  };

  const addMoreOption = () => {
    if (options.length < 6) {
      setOptions([...options, { name: "", is_correct: 0 }]);
    }
  };

  const fetchExam = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Question.index();
      if (response?.status === 200) {
        setQuestion(response?.data?.data || []);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchExam();
  }, [fetchExam]);


  const onSubmit = async (data) => {

    const newobj = {
      question_id: data.question_id,
      option: options,
    };
    // console.log("Options Created:", newobj);
    try {
     
      const response = await NetworkServices.Option.store(newobj);  
      console.log("response",response);
      if (responseChecker(response, 200)) {
        navigate("/dashboard/option-list");
        return Toastify.Success("Options Created Successfully!");
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };


  const propsData = {
    pageTitle: "Create New Options",
    pageIcon: <IoIosCreate />,
    buttonName: "Option List",
    buttonUrl: "/dashboard/option-list",
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
          <label htmlFor="exam" className="block text-gray-600 font-medium">
            Question Name
          </label>
          <select
            id="question"
            {...register("question_id")}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="">Select a category</option>
            {question.map((singlequestion) => (
              <option
                key={singlequestion.question_id}
                value={singlequestion.question_id}
              >
                {singlequestion.question}
              </option>
            ))}
          </select>
          {errors.exam_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.exam_id.message}
            </p>
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
                    checked={option.is_correct === 1}
                    onChange={(e) => handleCheckboxChange(index, e)}
                    className="mr-2"
                  />
                  <span className="text-sm">Correct Option</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none mt-4 "
          >
            {loading ? "Loading" : "Save Options"}
          </button>
          {options.length < 6 && (
            <button
              type="button"
              onClick={addMoreOption}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none mt-4  "
            >
              Add More Option
            </button>
          )}
        </div>
      </form>
    </>
  );
};
