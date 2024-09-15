import { TbRectangle } from "react-icons/tb";
import { IoMdDownload } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { GiArrowCursor } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa6";

function Controllers({ onShapeChange, currentShape }) {
  return (
    <div
      className={`grid grid-cols-2 gap-5 px-3 py-2 mx-auto border rounded-lg shadow-lg w-fit  `}
    >
      <button
        onClick={() => onShapeChange("line")}
        className={`p-2 rounded-md hover:bg-slate-700 hover:text-white ${
          currentShape === "line" ? "bg-slate-700 text-white" : ""
        }`}
      >
        <LuPencil size={24} />
      </button>

      <button
        onClick={() => onShapeChange("rectangle")}
        className={`p-2 rounded-md hover:bg-slate-700 hover:text-white ${
          currentShape === "rectangle" ? "bg-slate-700 text-white" : ""
        }`}
      >
        <TbRectangle size={24} />
      </button>
      <button
        className={`p-2 hover:bg-gray-200 ${
          currentShape === "x" ? "bg-gray-200" : ""
        }`}
      >
        <IoMdDownload size={24} />
      </button>
      <button>
        <FaLongArrowAltRight size={24} />
      </button>

      <button
        className={`p-2 hover:bg-gray-200 ${
          currentShape === "x" ? "bg-gray-200" : ""
        }`}
      >
        <GiArrowCursor size={24} />
      </button>
      <button
        onClick={() => onShapeChange("circle")}
        className={`p-2 rounded-md hover:bg-slate-700 hover:text-white ${
          currentShape === "circle" ? "bg-slate-700 text-white" : ""
        }`}
      >
        <FaRegCircle size={24} />
      </button>
    </div>
  );
}

export default Controllers;
