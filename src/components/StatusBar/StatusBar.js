import React from "react";
import "./StatusBar.scss";

const StatusBar = ({ mode }) => {
  return (
    <div className="StatusBar">
      <p>{mode}</p>
    </div>
  );
};

export default StatusBar;
