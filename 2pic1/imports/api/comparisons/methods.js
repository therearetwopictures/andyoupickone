// Methods related to comparisons

import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Comparisons } from "./comparisons.js";

Meteor.methods({
  "comparisons.insert"(title, url) {
    check(url, String);
    check(title, String);

    return Comparisons.insert({
      url,
      title,
      createdAt: new Date()
    });
  },
  "comparisons.addNew"() {
    return Comparisons.insert({});
  }
});
