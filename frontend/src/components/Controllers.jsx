import { TbRectangle } from "react-icons/tb";
import { IoMdDownload } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { GiArrowCursor } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa6";
import { FiMousePointer } from "react-icons/fi";
import { CiText } from "react-icons/ci";

function Controllers({ onShapeChange, selectedOption }) {
  return (
    <div
      className={`grid grid-cols-2 gap-5 px-3 py-2 mx-auto border rounded-lg shadow-lg w-fit  `}
    >
      <button
        onClick={() => onShapeChange("line")}
        className={`p-2 rounded-md hover:bg-slate-700 hover:text-white ${
          selectedOption === "line" ? "bg-slate-700 text-white" : ""
        }`}
      >
        <LuPencil size={24} />
      </button>

      <button
        onClick={() => onShapeChange("select")}
        className={`p-2 rounded-md hover:bg-slate-700 hover:text-white ${
          selectedOption === "select" ? "bg-slate-700 text-white" : ""
        }`}
      >
        <FiMousePointer size={24} />
      </button>
      <button
        onClick={() => onShapeChange("rectangle")}
        className={`p-2 rounded-md hover:bg-slate-700 hover:text-white ${
          selectedOption === "rectangle" ? "bg-slate-700 text-white" : ""
        }`}
      >
        <TbRectangle size={24} />
      </button>

      <button
        className={`p-2 rounded-md hover:bg-slate-700 hover:text-white ${
          selectedOption === "text" ? "bg-slate-700 text-white" : ""
        }`}
        onClick={() => onShapeChange("text")}
      >
        <CiText size={24} />
      </button>
      <button
        onClick={() => onShapeChange("circle")}
        className={`p-2 rounded-md hover:bg-slate-700 hover:text-white ${
          selectedOption === "circle" ? "bg-slate-700 text-white" : ""
        }`}
      >
        <FaRegCircle size={24} />
      </button>
    </div>
  );
}

export default Controllers;
