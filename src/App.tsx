// src/App.tsx
import React, { useState } from 'react';
import ImageCanvas, { Point } from './components/ImageCanvas';
import ExportButton from './components/ExportButton';

const App: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Roof Drawing App</h1>
      <ImageCanvas points={points} setPoints={setPoints} />
      <ExportButton points={points} />
    </div>
  );
};

export default App;
