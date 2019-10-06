import React, { useState } from "react";

import { useHotkeys } from "react-hotkeys-hook";

import Foto from "../Foto/Foto";
import StatusBar from "../StatusBar/StatusBar";

import "./Deck.scss";

function clip(value, range) {
  if (value > range[1]) {
    value = range[1];
  } else if (value < range[0]) {
    value = range[0];
  }
  return value;
}

const Deck = ({ slides }) => {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState("view");
  console.log(index);

  useHotkeys("left", () =>
    setIndex(prevIndex => clip(prevIndex - 1, [0, slides.length - 1]))
  );
  useHotkeys("right", () =>
    setIndex(prevIndex => clip(prevIndex + 1, [0, slides.length - 1]))
  );
  useHotkeys("d", () =>
    setMode(prevMode => (prevMode === "draw" ? "view" : "draw"))
  );
  useHotkeys("z", () =>
    setMode(prevMode => (prevMode === "zoom" ? "view" : "zoom"))
  );

  const slide = slides[index];

  return (
    <div className="Deck">
      <Foto slide={slide} mode={mode}></Foto>
      <StatusBar mode={mode} />
    </div>
  );
};

export default Deck;
