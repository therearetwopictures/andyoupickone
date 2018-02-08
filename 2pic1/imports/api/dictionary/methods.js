import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Dictionary } from "./dictionary.js";

// Helper function
const seedGenerator = () => {
  const seed1 = Math.floor(Math.random() * 143090);
  const seed2 = Math.floor(Math.random() * 143090);
  const seed3 = Math.floor(Math.random() * 143090);
  return [seed1, seed2, seed3];
};

Meteor.methods({
  "dictionary.generateSeedWords"() {
    return seedGenerator().map(async seed => {
      console.log(seed);
      const word = await Dictionary.find({ id: `${seed}` }).fetch();
      console.log(word[0].word);
      return word[0].word;
    });
  }
});
