import React, { Component } from "react";
import "./styles.css";

const GoatComponent = props => (
  <div className="container">
    <h1>GOAT</h1>
    <div className="item">
      <div className="goat-picture-wrapper">
        <h1>Most Popular Image:</h1>
        <img src={props.mostPopularImage.url} />
        <div className="desc">
          Picked {props.mostPopularImage.count}{" "}
          {props.mostPopularImage.count > 1 ? "times" : "time"}
        </div>
      </div>

      <div className="goat-picture-wrapper">
        <h1>Least Popular Image:</h1>
        <img src={props.leastPopularImage.url} />
        <div className="desc">
          Picked {props.leastPopularImage.count}{" "}
          {props.leastPopularImage.count > 1 ? "times" : "time"}
        </div>
      </div>
    </div>
    <h1>Most Popular Comparison:</h1>
    <p>
      Viewed {props.mostPopularComparison.count}{" "}
      {props.mostPopularComparison.count > 1 ? "times" : "time"}
    </p>
    <div className="item">
      <div className="goat-picture-wrapper">
        <img src={props.mostPopularComparison.urlA} />
        <div className="desc">
          Picked {props.mostPopularComparison.ACount}{" "}
          {props.mostPopularComparison.ACount > 1 ? "times" : "time"}
        </div>
      </div>
      <div className="goat-picture-wrapper">
        <img src={props.mostPopularComparison.urlB} />
        <div className="desc">
          Picked {props.mostPopularComparison.BCount}{" "}
          {props.mostPopularComparison.BCount > 1 ? "times" : "time"}
        </div>
      </div>
    </div>
    <h1>Most Contentious Comparison:</h1>
    <p>
      Viewed {props.closestToEvenSplit.count}{" "}
      {props.closestToEvenSplit.count > 1 ? "times" : "time"}
    </p>
    <div className="item">
      <div className="goat-picture-wrapper">
        <img src={props.closestToEvenSplit.urlA} />
        <div className="desc">
          Picked {props.closestToEvenSplit.ACount}{" "}
          {props.closestToEvenSplit.ACount > 1 ? "times" : "time"}
        </div>
      </div>
      <div className="goat-picture-wrapper">
        <img src={props.closestToEvenSplit.urlB} />
        <div className="desc">
          Picked {props.closestToEvenSplit.BCount}{" "}
          {props.closestToEvenSplit.BCount > 1 ? "times" : "time"}
        </div>
      </div>
    </div>
  </div>
);

export default GoatComponent;
