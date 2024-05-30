import React from "react";
import { Point } from "./ImageCanvas";

interface ClearButtonProps {
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
}

const ClearButton: React.FC<ClearButtonProps> = ({ setPoints }) => {
  const clearPoints = () => {
    setPoints([]);
  };

  return (
    <button
      onClick={clearPoints}
      className="mt-4 ml-4 p-2 bg-red-500 text-white rounded"
    >
      Clear Drawing
    </button>
  );
};

export default ClearButton;
