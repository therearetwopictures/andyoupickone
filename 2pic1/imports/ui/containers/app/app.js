import Header from "../../components/header/header.js";
import Picture from "../../components/picture/picture.js";

import React, { Component } from "react";

export default class home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Picture />
      </div>
    );
  }
}
