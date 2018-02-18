import React, { Component } from "react";
import "./styles.css";

const GoatComponent = props => (
  <div className="container">
    <div className="item">
      <div className="picture-wrapper">
        <h1>Most Popular Image:</h1>
        <img src={props.mostPopularImage.url} />
        <div className="desc">
          Picked {props.mostPopularImage.count}{" "}
          {props.mostPopularImage.count > 1 ? "times" : "time"}
        </div>
      </div>

      <div className="picture-wrapper">
        <h1>Least Popular Image:</h1>
        <img src={props.leastPopularImage.url} />
        <div className="desc">
          Picked {props.leastPopularImage.count}{" "}
          {props.leastPopularImage.count > 1 ? "times" : "time"}
        </div>
      </div>
    </div>
  </div>
);

export default GoatComponent;
