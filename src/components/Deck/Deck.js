import React, { useState, useEffect } from "react";

import { useHotkeys } from "react-hotkeys-hook";
import { useQueryParams, NumberParam } from "use-query-params";

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
  const [{ index }, setQuery] = useQueryParams({ index: NumberParam });
  const [mode, setMode] = useState("view");
  // const [slide, setSlide] = useState(null);

  // useEffect(() => {
  //   api
  //     .getFoto(index || 0) //.then(data => console.log(data));
  //     .then(response => new Buffer(response.data, "binary").toString("base64"))
  //     .then(image => setSlide(image));
  // }, [index]);

  useHotkeys(
    "left",
    () =>
      setQuery({
        index: clip(index ? index - 1 : 0 - 1, [0, slides.length - 1])
      }),
    [index, slides]
  );
  useHotkeys(
    "right",
    () =>
      setQuery({
        index: clip(index ? index + 1 : 0 + 1, [0, slides.length - 1])
      }),
    [index, slides]
  );
  useHotkeys("d", () =>
    setMode(prevMode => (prevMode === "draw" ? "view" : "draw"))
  );
  useHotkeys("z", () =>
    setMode(prevMode => (prevMode === "zoom" ? "view" : "zoom"))
  );

  // const slide = slides[index || 0];

  const slideIndex = index || 0;

  return (
    <div className="Deck">
      <Foto
        slide={`api/fotos/${slideIndex}`}
        mode={mode}
        drawColor={"black"}
      ></Foto>
      <StatusBar mode={mode} />
    </div>
  );
};

export default Deck;
