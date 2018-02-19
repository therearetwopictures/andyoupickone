import React, { Component } from "react";
import "./styles.css";
import PropTypes from "prop-types";

const GoatComponent = ({
  mostPopularImage,
  leastPopularImage,
  mostPopularComparison,
  closestToEvenSplit
}) => (
  <div className="container">
    <div className="header">
      <h1>GOAT</h1>
    </div>
    <div className="item">
      <div className="goat-picture-wrapper">
        <h2>Most Popular Image:</h2>
        <img src={mostPopularImage.url} />
        <div className="desc">
          Picked {mostPopularImage.count}{" "}
          {mostPopularImage.count !== 1 ? "times" : "time"}
        </div>
      </div>

      <div className="goat-picture-wrapper">
        <h2>Least Popular Image:</h2>
        <img src={leastPopularImage.url} />
        <div className="desc">
          Picked {leastPopularImage.count}{" "}
          {leastPopularImage.count !== 1 ? "times" : "time"}
        </div>
      </div>
    </div>
    <h2>Most Popular Comparison:</h2>
    <p>
      Viewed {mostPopularComparison.count}{" "}
      {mostPopularComparison.count !== 1 ? "times" : "time"}
    </p>
    <div className="item">
      <div className="goat-picture-wrapper">
        <img src={mostPopularComparison.urlA} />
        <div className="desc">
          Picked {mostPopularComparison.ACount}{" "}
          {mostPopularComparison.ACount !== 1 ? "times" : "time"}
        </div>
      </div>
      <div className="goat-picture-wrapper">
        <img src={mostPopularComparison.urlB} />
        <div className="desc">
          Picked {mostPopularComparison.BCount}{" "}
          {mostPopularComparison.BCount !== 1 ? "times" : "time"}
        </div>
      </div>
    </div>
    <h2>Most Contentious Comparison:</h2>
    <p>
      Viewed {closestToEvenSplit.count}{" "}
      {closestToEvenSplit.count !== 1 ? "times" : "time"}
    </p>
    <div className="item">
      <div className="goat-picture-wrapper">
        <img src={closestToEvenSplit.urlA} />
        <div className="desc">
          Picked {closestToEvenSplit.ACount}{" "}
          {closestToEvenSplit.ACount !== 1 ? "times" : "time"}
        </div>
      </div>
      <div className="goat-picture-wrapper">
        <img src={closestToEvenSplit.urlB} />
        <div className="desc">
          Picked {closestToEvenSplit.BCount}{" "}
          {closestToEvenSplit.BCount !== 1 ? "times" : "time"}
        </div>
      </div>
    </div>
  </div>
);

GoatComponent.defaultProps = {
  mostPopularImage: {},
  leastPopularImage: {},
  mostPopularComparison: {},
  closestToEvenSplit: {}
};

GoatComponent.propTypes = {
  mostPopularImage: PropTypes.object,
  leastPopularImage: PropTypes.object,
  mostPopularComparison: PropTypes.object,
  closestToEvenSplit: PropTypes.object
};

export default GoatComponent;
