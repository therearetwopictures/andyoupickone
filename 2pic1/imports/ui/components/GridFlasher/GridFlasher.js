import React from "react";
import Flasher from "./Flasher";
import "./styles.css";
const GridFlasher = ({ comps }) => (
  <div className="flasher-wrapper">
    <h2>user activity - grid flasher</h2>
    {comps.map(comp => <Flasher key={comp._id} id={comp._id} />)}
  </div>
);
export default GridFlasher;
