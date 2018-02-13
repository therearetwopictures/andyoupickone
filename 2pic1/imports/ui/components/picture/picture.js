import React, { Component } from "react";
import "./styles.css";

export default class picture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

  updateSelectedStyle = () => {
    this.setState({ selected: true });
    setTimeout(() => {
      this.setState({ selected: false });
    }, 128);
  };
  render() {
    return (
      <div className={this.state.selected ? "picture selected" : "picture"}>
        <img
          src={this.props.url}
          onClick={() => {
            this.updateSelectedStyle();
            this.props.handleClick("A");
          }}
        />
      </div>
    );
  }
}
