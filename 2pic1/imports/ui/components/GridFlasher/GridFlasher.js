import React from "react";
import Flasher from "./Flasher";

const GridFlasher = ({ comps }) =>
  comps.map(comp => <Flasher key={comp._id} A={comp.A} B={comp.B} />);
