import { useState, useRef } from "react";
import { Layer, Stage, Line, Rect, Circle, Text } from "react-konva";
import Controllers from "../components/Controllers";

function Whiteboard() {
  // track of all the drawn shapes
  const [shapes, setShapes] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [selectedOption, setSelectedOption] = useState("line");
  const [textAnnotation, setTextAnnotation] = useState("");

  const stageRef = useRef();

  console.log(shapes);

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
    setShapes(updatedShapes);
  };

  return (
    <main className="relative block h-screen pt-20 md:overflow-hidden">
      {/* Controllers  */}
      <div className="controller z-20 bg-white fixed top-[50%] right-0 translate-y-[-50%] border rounded-lg shadow-lg overflow-hidden ">
        <Controllers
          onShapeChange={handleShapeChange}
          selectedOption={selectedOption}
        />
        <button className="w-full p-2 text-white bg-green-500 hover:bg-green-600">
          Save
        </button>
      </div>

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
