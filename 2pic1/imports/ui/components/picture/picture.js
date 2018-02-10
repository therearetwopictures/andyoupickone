import React, { Component } from "react";
import "./styles.css";

export default class picture extends Component {
  render() {
    return (
      <div className="picture-wrapper">
        <div className="picture">
          <img
            src={this.props.urlA}
            onClick={() => {
              this.props.handleClick();
            }}
          />
        </div>
        <div className="picture">
          <img
            src={this.props.urlB}
            onClick={() => {
              this.props.handleClick();
            }}
          />
        </div>
      </div>
    );
  }
}
