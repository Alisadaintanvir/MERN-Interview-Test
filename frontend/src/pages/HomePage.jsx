import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function HomePage() {
  const [drawings, setDrawings] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch all the drawings
  useEffect(() => {
    setLoading(true);
    const fetchDrawings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/whiteboard"
        );
        setDrawings(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDrawings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/whiteboard/${id}`);
      setDrawings(drawings.filter((drawing) => drawing._id !== id));
      toast.success("Drawing deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <main>
      <div className="container pt-24 mx-auto text-slate-600 space-y-14">
        <div className="title">
          <h2 className="text-4xl font-semibold">Drawing List</h2>
        </div>

        <div className="flex flex-col w-full md:w-2/3 rounded h-[70vh] list overflow-y-auto">
          {drawings.map((drawing) => (
            <div
              key={drawing._id}
              className="flex items-center justify-between py-5 duration-300 ease-linear border card px-14 hover:bg-gray-100 hover:transition-all"
            >
              <div className="space-y-3">
                <Link
                  to={`/whiteboard/${drawing._id}`}
                  className="text-2xl font-semibold hover:text-blue-500"
                >
                  {drawing.name}
                </Link>
                <p className="text-sm">Created on {drawing.createdAt}</p>
              </div>
              <div className="flex gap-3">
                <Link
                  to={`/whiteboard/${drawing._id}`}
                  className="px-3 py-1 text-white border rounded bg-slate-700 hover:bg-slate-800"
                >
                  View
                </Link>
                <button
                  className="px-3 py-1 text-white bg-red-500 border rounded hover:bg-red-600"
                  onClick={() => handleDelete(drawing._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default HomePage;
