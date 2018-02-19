import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import Comparisons from "../../../api/comparisons/comparisons";
class Flasher extends React.Component {
  constructor() {
    super();
    this.state = {
      A: undefined,
      B: undefined,
      className: "greyFlasher"
    };
  }
  async componentWillReceiveProps(nextProps) {
    if (nextProps.comp[0].A !== this.state.A) {
      this.setState({ A: nextProps.comp[0].A, className: "greenFlasher" });
      setTimeout(() => {
        this.setState({ className: "greyFlasher" });
      }, 1000);
    }
    if (this.state.B === undefined)
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1337);
      });
    if (nextProps.comp[0].B !== this.state.B) {
      this.setState({ B: nextProps.comp[0].B, className: "salmonFlasher" });
      setTimeout(() => {
        this.setState({ className: "greyFlasher" });
      }, 1000);
    }
  }

  render() {
    return <div className={`flasher  ${this.state.className}`} />;
  }
}

export default withTracker(({ id }) => {
  Meteor.subscribe("comparisons.byCompId", id);
  return {
    comp: Comparisons.find(id).fetch()
  };
})(Flasher);
