import { Link } from "react-router-dom";
import { IoAddCircleSharp, IoListCircleSharp } from "react-icons/io5";
import { MdDownloadForOffline } from "react-icons/md";

export const PageHeader = ({ propsData }) => {

   const getIcon = (type) => {
    switch (type) {
      case "add":
        return <IoAddCircleSharp className="text-lg" />;
      case "list":
        return <IoListCircleSharp className="text-lg" />;
      case "download":
        return <MdDownloadForOffline className="text-lg" />;
      default:
        return null;
    }
  };

  return (
    <section className="flex items-center justify-between shadow-md p-4 rounded-lg bg-white my-3">
      <div>
        <p className="flex items-center gap-2 font-semibold text-gray-700 text-xl capitalize">
          {propsData?.pageIcon} 
          <span>{propsData?.pageTitle}</span>
        </p>
        <p className="text-sm text-gray-500 lowercase">
          Here is {propsData?.pageTitle} page
        </p>
      </div>

      {propsData?.buttonName && (
        <Link
          className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 transition-all ease-in-out duration-200"
          to={propsData?.buttonUrl}
        >
          {getIcon(propsData?.type)}
          {propsData?.buttonName}
        </Link>
      )}
    </section>
  );
};

