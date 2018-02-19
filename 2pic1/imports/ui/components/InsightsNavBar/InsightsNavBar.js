import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const InsightsNavBar = () => (
  <div className="stats-nav-bar">
    <Link className="nav-button" to="/">
      home
    </Link>
    <Link className="nav-button" to="/goat">
      goats
    </Link>
    <Link className="nav-button" to="/stats">
      stats
    </Link>
    <Link className="nav-button" to="/leaders">
      leaders
    </Link>
  </div>
);

export default InsightsNavBar;
