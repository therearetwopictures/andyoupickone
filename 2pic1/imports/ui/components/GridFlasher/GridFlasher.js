import React from "react";
import Flasher from "./Flasher";
import "./styles.css";
const GridFlasher = ({ comps }) => (
  <div className="flasher-wrapper">
    {comps.map(comp => <Flasher key={comp._id} A={comp.A} B={comp.B} />)}
  </div>
);
