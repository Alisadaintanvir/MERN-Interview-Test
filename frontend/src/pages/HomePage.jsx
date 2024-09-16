import { useEffect, useState } from "react";
import axios from "axios";
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

  return (
    <main>
      <div className="container pt-24 mx-auto space-y-14">
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
                <h3 className="text-2xl font-semibold">{drawing.name}</h3>
                <p className="text-sm">Created on {drawing.createdAt}</p>
              </div>
              <div className="flex gap-3">
                <button className="px-3 py-1 text-white border rounded bg-slate-700 hover:bg-slate-800">
                  View
                </button>
                <button className="px-3 py-1 text-white bg-red-500 border rounded hover:bg-red-600">
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
