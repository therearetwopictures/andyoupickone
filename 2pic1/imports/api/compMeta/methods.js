// Methods related to comparison MetaData
import { Meteor } from "meteor/meteor";
import CompMeta from "../compMeta/compMeta";
import { classifyImage } from "./watsonHelpers/watson";

const watsonSettings = Meteor.settings.watson;

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
  },
  "compMeta.classifyImage"(...urls) {
    urls.forEach(url => {
      let defaultParameters = {
        api_key: watsonSettings.api_key,
        imageurl: url,
        use_unauthenticated: false
      };
      classifyImage(defaultParameters)
        .then(results => console.log(JSON.stringify(results, null, 2)))
        .catch(error => console.log(error.message));
    });
  }
});
