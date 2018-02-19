import React from "react";

export default class Flasher extends React.Component {
  constructor() {
    super();
    this.state = {
      A: this.props.A,
      B: this.props.B,
      className: "greyFlasher"
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.A !== this.state.A) {
      this.setState({ A: nextProps.A, className: "greenFlasher" });
      setTimeout(() => {
        this.setState({ className: "greyFlasher" });
      }, 128);
    }
    if (nextProps.B !== this.state.B) {
      this.setState({ B: nextProps.B, className: "salmonFlasher" });
      setTimeout(() => {
        this.setState({ className: "greyFlasher" });
      }, 128);
    }
  }

  render() {
    return <div className={`flasher  ${this.state.className}`} />;
  }
}
