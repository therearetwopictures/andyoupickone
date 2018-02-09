import React, { Component } from "react";
import "./styles.css";

export default class picture extends Component {
  render() {
    return (
      <div className="picture-wrapper">
        <div className="picture">Picture</div>
        <div className="picture">Picture</div>
      </div>
    );
  }
}
