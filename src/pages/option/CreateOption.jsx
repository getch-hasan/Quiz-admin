import { useForm } from "react-hook-form";
import { IoIosCreate } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { NetworkServices } from "../../network";
import { networkErrorHandeller, responseChecker } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { Toastify } from "../../components/toastify";
import { SingleSelect } from "../../components/input";

export const CreateOption = () => {
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [exam, setExam] = useState([]);
  const [options, setOptions] = useState([
    { name: "", is_correct: 0 },
    { name: "", is_correct: 0 },
    { name: "", is_correct: 0 },
    { name: "", is_correct: 0 },
  ]);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  console.log("question", question);

  const categoryId = watch("category_id");
  const examId = watch("exam_id");

  const navigate = useNavigate();

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
  }, [fetchCategory]);

  // fetch exam
  const fetchExam = useCallback(async (categoryId) => {
    // setLoading(true); // Start loading
    
    try {
      const response = await NetworkServices.Exam.index({
        params: { category_id: categoryId },
      });

      if (response && response.status === 200) {
        const result = response.data.data.map((item, index) => {
          return {
            label: item.exam_name,
            value: item.exam_name,
            ...item,
          };
        });
        console.log(result);
        setExam(result);
      }
    } catch (error) {
      console.error("Fetch Category Error:", error);
    }
    // setLoading(false); // End loading (handled in both success and error)
  }, []);

  // category api fetch
  useEffect(() => {
    fetchExam( categoryId );
  }, [categoryId, fetchExam]);

  // fetch exam
  const fetchQuestion = useCallback(
    async (examId) => {
      setLoading(true); // Start loading

      try {
        const response = await NetworkServices.Question.index(
          examId 
        );

        if (response && response.status === 200) {
          const result = response.data.data.map((item, index) => {
            return {
              label: item.question,
              value: item.question,
              ...item,
            };
          });
          console.log(result);
          setQuestion(result);
        }
      } catch (error) {
        console.error("Fetch Category Error:", error);
      }
      setLoading(false); // End loading (handled in both success and error)
    },
    []
  );

  // category api fetch
  useEffect(() => {
    fetchQuestion(examId);
  }, [examId,fetchQuestion]);

  const onSubmit = async (data) => {
    const newobj = {
      question_id: data.question_id,
      option: options,
    };
    // console.log("Options Created:", newobj);
    try {
      const response = await NetworkServices.Option.store(newobj);
      console.log("response", response);
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
            // error={errors} // Pass an error message if validation fails
          />
        </div>

        <div className="mb-4">
          <SingleSelect
            name="singleSelects"
            control={control}
            options={exam}
            rules={{ required: "Exam   selection is required" }}
            onSelected={(selected) => setValue("exam_id", selected?.exam_id)}
            placeholder="Select a Exam *"
            error={errors.singleSelects?.message}
            label="Choose a exam *"
            disabled={!categoryId}
          />
        </div>

        <div className="mb-4">
          <SingleSelect
            name="singleSelectss"
            control={control}
            options={question}
            rules={{ required: "Question selection is required" }}
            onSelected={(selected) =>
              setValue("question_id", selected?.question_id)
            }
            placeholder="Select a Question *"
            error={errors.singleSelectss?.message}
            label="Choose a question *"
            disabled={!examId}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option, index) => (
            <div key={index}>
              <label className="text-sm  text-gray-500">{`Option ${
                index + 1
              }`}</label>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex-1">
                  <input
                    type="text"
                    value={option.name}
                    onChange={(e) => handleOptionChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none text-sm mb-1 text-gray-500"
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

        <div className="flex justify-between gap-5 ">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none mt-4  "
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
