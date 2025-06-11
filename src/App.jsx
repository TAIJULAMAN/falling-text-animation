import React, { useState } from 'react';
import { OnHover, OnClick } from './Home';

function App() {
  const [triggerType, setTriggerType] = useState('hover');

  return (
    <div className="w-full overflow-hidden max-w-4xl bg-white p-10 flex flex-col items-center justify-center border border-red-500">
      <div className="w-full h-[100vh] ">
        <div className="mb-8">
          <select
            value={triggerType}
            onChange={(e) => setTriggerType(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="hover">Hover</option>
            <option value="click">Click</option>
          </select>
        </div>
        <div className=" w-full h-full">
          {triggerType === 'hover' ? (
            <OnHover />
          ) : (
            <OnClick />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
