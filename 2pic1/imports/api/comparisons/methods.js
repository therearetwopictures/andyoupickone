// Methods related to comparisons

import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Comparisons } from "./comparisons.js";

Meteor.methods({
  "comparisons.insert"(urlA, urlB) {
    check(urlA, String);
    check(urlB, String);

    return Comparisons.insert({
      urlA,
      urlB,
      createdAt: new Date()
    });
  }
});
