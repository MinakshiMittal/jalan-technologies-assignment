// src/components/ExportButton.tsx
import React from 'react';
import { Point } from './ImageCanvas';

interface ExportButtonProps {
  points: Point[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ points }) => {
  const exportImage = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas || points.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate the bounding box
    const minX = Math.min(...points.map(p => p.x));
    const minY = Math.min(...points.map(p => p.y));
    const maxX = Math.max(...points.map(p => p.x));
    const maxY = Math.max(...points.map(p => p.y));

    const width = maxX - minX;
    const height = maxY - minY;

    // Create a temporary canvas to draw the cropped image
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    // Draw the cropped area
    tempCtx.drawImage(canvas, minX, minY, width, height, 0, 0, width, height);

    // Draw the lines on the temporary canvas
    tempCtx.beginPath();
    tempCtx.moveTo(points[0].x - minX, points[0].y - minY);
    points.forEach(point => tempCtx.lineTo(point.x - minX, point.y - minY));
    tempCtx.stroke();

    // Export the image
    const link = document.createElement('a');
    link.download = 'roof-drawing.png';
    link.href = tempCanvas.toDataURL();
    link.click();
  };

  return (
    <button
      onClick={exportImage}
      className="mt-4 p-2 bg-blue-500 text-white rounded"
    >
      Export Image
    </button>
  );
};

export default ExportButton;
