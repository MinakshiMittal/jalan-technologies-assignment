import React, { useRef, useEffect } from "react";

export interface Point {
  x: number;
  y: number;
}

interface ImageCanvasProps {
  points: Point[];
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({ points, setPoints }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = "/homeRoofImage.webp";

    img.onload = () => {
      canvas && ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setPoints([...points, { x, y }]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context) return;

    const img = new Image();
    img.src = "/homeRoofImage.webp";

    img.onload = () => {
      canvas && context.clearRect(0, 0, canvas.width, canvas.height);
      canvas && context.drawImage(img, 0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.moveTo(points[0]?.x, points[0]?.y);
      points.forEach((point) => context.lineTo(point.x, point.y));
      context.stroke();
    };
  }, [points]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={480}
      className="border rounded-lg"
      onClick={handleCanvasClick}
    />
  );
};

export default ImageCanvas;
