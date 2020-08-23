import React from "react";
import "./App.css";
import Title from "./components/Title";
import { Minesweeper } from "./components/Minesweeper";
import "./components/Flex.css";

function App() {
  return (
    <div className="App">
      <div id="title-container">
        <Title text="Minesweeper"></Title>
      </div>
      <div id="game-container" className="flex-row flex-main-axis-center">
        <Minesweeper></Minesweeper>
      </div>
    </div>
  );
}

export default App;
