import React from 'react';
import './App.css';
import Navigation from "./Side Navigation";

function App() {
  return (
      <div className={"w-screen h-screen"}>
        <div className="App App-header bg-gray-900">
          <div>
             <a href={"/"}  className={"cursor-pointer"}>DMD Editor</a>
          </div>
        </div>
          <Navigation/>
      </div>
  );
}

export default App;
