// Methods related to comparison MetaData
import { Meteor } from "meteor/meteor";
import CompMeta from "../compMeta/compMeta";
import { classifyImage } from "./watsonHelpers/watson";

const watsonSettings = Meteor.settings.watson;
const defaultParameters = {
  api_key: watsonSettings.api_key,
  imageurl:
    "https://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/d/domestic-dog_thumb.jpg",
  url: watsonSettings.url,
  use_unauthenticated: false
};

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
  "compMeta.classifyImage"() {
    classifyImage(defaultParameters)
      .then(results => console.log(JSON.stringify(results, null, 2)))
      .catch(error => console.log(error.message));
  }
});
