import React from "react";
import Deck from "../Deck/Deck";

import "./App.scss";

const SLIDES = [
  `${process.env.PUBLIC_URL}/imgs/img1.jpg`,
  `${process.env.PUBLIC_URL}/imgs/img2.jpg`
];

function App() {
  return (
    <div className="App">
      <Deck slides={SLIDES}></Deck>
    </div>
  );
}

export default App;
