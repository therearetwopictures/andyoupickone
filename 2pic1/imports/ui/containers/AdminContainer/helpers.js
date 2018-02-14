import { Meteor } from "meteor/meteor";
import Comparisons from "../../../api/comparisons";

export function watsonBatchClassifyImages() {
  let comps = Comparisons.find({ tagsA: null }, { limit: 4 });
  console.log(comps);
}
