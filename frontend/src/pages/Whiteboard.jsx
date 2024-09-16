import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Layer, Stage, Line, Rect, Circle, Text } from "react-konva";
import Controllers from "../components/Controllers";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Whiteboard() {
  const navigate = useNavigate();
  const { id } = useParams();
  // track of all the drawn shapes
  const [shapes, setShapes] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [selectedOption, setSelectedOption] = useState("line");
  const [textAnnotation, setTextAnnotation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drawingName, setDrawingName] = useState("");

  const stageRef = useRef();

  // fetch drawing based on id
  useEffect(() => {
    const fetchDrawing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/whiteboard/${id}`
        );
        setShapes(response.data.elements || []);
        setDrawingName(response.data.name || "Untitles drawing");
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchDrawing();
    }
  }, [id]);

  // handle to save the drawing
  const handleSave = async () => {
    try {
      // Drawing data to be sent to the server
      const dataPayload = {
        name: drawingName,
        elements: shapes,
      };

      // if id is present, update the drawing
      if (id) {
        await axios.patch(
          `http://localhost:5000/api/whiteboard/${id}`,
          dataPayload
        );
        toast.success("Drawing updated successfully");
        navigate("/");
      } else {
        // if id is not present, create a new drawing
        const response = await axios.post(
          "http://localhost:5000/api/whiteboard/add",
          dataPayload
        );

        toast.success("Drawing saved successfully");
        navigate("/");
        console.log(response.data);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("error", error);
    }
  };

  // handler to start drawing shapes
  const handleMouseDown = (e) => {
    if (e.target === e.target.getStage()) {
      if (selectedOption !== "select") {
        setDrawing(true);

        // Get the current mouse position on the stage
        const position = e.target.getStage().getPointerPosition();
        if (selectedOption === "text") {
          // For text, we immediately add it to shapes
          setShapes([
            ...shapes,
            {
              id: Date.now(),
              type: selectedOption,
              x: position.x,
              y: position.y,
              text: textAnnotation || "Double click to edit",
            },
          ]);
          setTextAnnotation("");
        } else if (selectedOption === "line") {
          setShapes([
            ...shapes,
            {
              id: Date.now(),
              type: selectedOption,
              points: [position.x, position.y],
            },
          ]);
        } else {
          setShapes([
            ...shapes,
            {
              id: Date.now(),
              type: selectedOption,
              x: position.x,
              y: position.y,
              width: 0,
              height: 0,
              radius: 0,
            },
          ]);
        }
      }
    }
  };

  // handler to draw shapes
  const handleMouseMove = (e) => {
    if (!drawing || selectedOption === "text") return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastShape = shapes[shapes.length - 1];

    if (lastShape.type === "circle") {
      // Calculate the radius for circles based on distance from the start point
      const newRadius = Math.sqrt(
        Math.pow(point.x - lastShape.x, 2) + Math.pow(point.y - lastShape.y, 2)
      );
      lastShape.radius = newRadius;
    } else if (lastShape.type === "rectangle") {
      lastShape.width = point.x - lastShape.x;
      lastShape.height = point.y - lastShape.y;
    } else if (lastShape.type === "line") {
      lastShape.points = lastShape.points.concat([point.x, point.y]);
    }

    // updated version of shape
    shapes.splice(shapes.length - 1, 1, lastShape);
    setShapes(shapes.concat());
  };

  // handler to stop drawing
  const handleMouseUp = () => {
    setDrawing(false);
  };

  // Changing shape by clicking on the controller button
  const handleShapeChange = (shape) => {
    setSelectedOption(shape);
  };

  // Drag shape
  const handleDragEnd = (e, id) => {
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === id) {
        return {
          ...shape,
          x: e.target.x(),
          y: e.target.y(),
        };
      }
      return shape;
    });
    setShapes(updatedShapes);
  };

  // Edit text
  const handleTextEdit = (e, id) => {
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === id) {
        return {
          ...shape,
          text: e.target.value,
        };
      }
      return shape;
    });
    setShapes([...updatedShapes]);
  };

  // handle to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // handle to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDrawingName("");
  };

  return (
    <main className="relative block h-screen pt-20 md:overflow-hidden">
      {/* Controllers  */}
      <div className="controller z-20 bg-white fixed top-[50%] right-0 translate-y-[-50%] border rounded-lg shadow-lg overflow-hidden ">
        <Controllers
          onShapeChange={handleShapeChange}
          selectedOption={selectedOption}
        />
        <button
          className="w-full p-2 text-white bg-green-500 hover:bg-green-600"
          onClick={handleOpenModal}
        >
          {id ? "Update" : "Save"}
        </button>
      </div>

      {/* Show Modal to save the drawing */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-xl">
            <h2 className="mb-4 text-xl font-bold">
              {id ? "Update" : "Save"} Drawing
            </h2>
            <input
              type="text"
              value={drawingName}
              onChange={(e) => setDrawingName(e.target.value)}
              placeholder="Enter drawing name"
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 mr-2 text-gray-600 border rounded hover:text-gray-800 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              >
                {id ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Canvas container */}
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Layer to hold all the drawn shapes */}
        <Layer>
          {shapes.map((shape, i) => {
            if (shape.type === "circle") {
              return (
                <Circle
                  key={i}
                  x={shape.x}
                  y={shape.y}
                  radius={shape.radius}
                  stroke="black"
                  draggable={selectedOption === "select"}
                  onDragEnd={(e) => handleDragEnd(e, shape.id)}
                />
              );
            } else if (shape.type === "rectangle") {
              return (
                <Rect
                  key={i}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  stroke="black"
                  draggable={selectedOption === "select"}
                  onDragEnd={(e) => handleDragEnd(e, shape.id)}
                />
              );
            } else if (shape.type === "line") {
              return (
                <Line
                  key={i}
                  points={shape.points}
                  stroke="black"
                  strokeWidth={2}
                  tension={0.5}
                  lineCap="round"
                  draggable={selectedOption === "select"}
                  onDragEnd={(e) => handleDragEnd(e, shape.id)}
                />
              );
            } else if (shape.type === "text") {
              return (
                <Text
                  key={i}
                  x={shape.x}
                  y={shape.y}
                  text={shape.text}
                  fontSize={16}
                  fill="black"
                  draggable={selectedOption === "select"}
                  onDragEnd={(e) => handleDragEnd(e, shape.id)}
                  onDblClick={() => {
                    const newText = prompt("Edit text:", shape.text);
                    if (newText !== null) {
                      handleTextEdit({ target: { value: newText } }, shape.id);
                    }
                  }}
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
    </main>
  );
}

export default Whiteboard;
