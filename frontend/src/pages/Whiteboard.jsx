import { useState, useRef } from "react";
import { Layer, Stage, Line, Rect, Circle } from "react-konva";
import Controllers from "../components/Controllers";

function Whiteboard() {
  const [shapes, setShapes] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState("line");
  const stageRef = useRef();

  const handleMouseDown = (e) => {
    setDrawing(true);
    const position = e.target.getStage().getPointerPosition();
    if (currentShape === "line") {
      setShapes([
        ...shapes,
        { type: currentShape, points: [position.x, position.y] },
      ]);
    } else {
      setShapes([
        ...shapes,
        {
          type: currentShape,
          x: position.x,
          y: position.y,
          width: 0,
          height: 0,
        },
      ]);
    }
  };

  const handleMouseMove = (e) => {
    if (!drawing) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastShape = shapes[shapes.length - 1];

    if (lastShape.type === "circle") {
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

    shapes.splice(shapes.length - 1, 1, lastShape);
    setShapes(shapes.concat());
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleShapeChange = (shape) => {
    setCurrentShape(shape);
  };

  return (
    <main className="relative h-screen pt-20 overflow-hidden">
      {/* Controllers  */}
      <div className="controller z-20 absolute top-[50%] right-0 translate-y-[-50%]">
        <Controllers
          onShapeChange={handleShapeChange}
          currentShape={currentShape}
        />
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
