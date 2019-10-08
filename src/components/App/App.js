import React, { useEffect, useReducer, useState } from "react";
import Deck from "../Deck/Deck";
import history from "../../history";

import { api } from "../../api/api";

import "./App.scss";

const SLIDES = [
  `${process.env.PUBLIC_URL}/imgs/img1.jpg`,
  `${process.env.PUBLIC_URL}/imgs/img2.jpg`
];

function App() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(() => {
    // listen for changes to the URL and force the app to re-render
    history.listen(() => {
      forceUpdate();
    });
  }, []);

  const [slides, setSlides] = useState([]);

  useEffect(() => {
    api
      .getFotos()
      .then(res => res.data)
      // .then(data => console.log(data))
      .then(data => setSlides(data));
  }, []);

  return (
    <div className="App">
      <Deck slides={slides}></Deck>
    </div>
  );
}

export default App;
