import React from "react";
import Deck from "../Deck/Deck";
import history from "../../history";

import "./App.scss";

const SLIDES = [
  `${process.env.PUBLIC_URL}/imgs/img1.jpg`,
  `${process.env.PUBLIC_URL}/imgs/img2.jpg`
];

function App() {
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => {
    // listen for changes to the URL and force the app to re-render
    history.listen(() => {
      forceUpdate();
    });
  }, []);
  return (
    <div className="App">
      <Deck slides={SLIDES}></Deck>
    </div>
  );
}

export default App;
