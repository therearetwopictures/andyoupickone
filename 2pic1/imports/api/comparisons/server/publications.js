// All comparisons-related publications

import { Meteor } from 'meteor/meteor';
import Comparisons from '../comparisons.js';

Meteor.publish('comparisons.all', () => Comparisons.find({}));
Meteor.publish('comparisons.allIdOnly', () => Comparisons.find({}, { fields: { _id: 1 } }));

Meteor.publish('comparisons.byCompId', (compId) => Comparisons.find(compId));
