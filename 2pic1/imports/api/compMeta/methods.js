// Methods related to comparison MetaData
import { Meteor } from "meteor/meteor";
import CompMeta from "../compMeta/compMeta";

Meteor.methods({
  "compMeta.updatePicks"(compId, pick) {
    if (pick && compId) {
      let update = {};
      let inc = {};
      inc[pick] = 1;
      update = { $inc: inc };
      CompMeta.update(
        {
          _id: compId
        },
        update
      );
    }
  }
});
