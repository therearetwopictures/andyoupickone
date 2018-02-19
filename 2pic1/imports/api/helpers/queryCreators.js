// create query and option strings for find
import { Meteor } from 'meteor/meteor';
import Comparisons from '../comparisons/comparisons';

//
// @params leastOrMost is -1 for highest and 1 for lowest
// AOrB is one of: A (for A and urlA) or B (for B and urlB)
// @returns an array: [{query}, {options}]
// where the query selects non-null elements matching A and B
// sorted in ascending (-1) or descending (1) order
export const createLeastOrMostPopular = (AOrB, leastOrMost) => {
    const query = {};
    query[AOrB] = { $nin: [null, '', 0] };

    const options = {};
    const fields = {};
    fields[AOrB] = 1;
    fields[`url${AOrB}`] = 1;
    const sort = {};
    sort[AOrB] = leastOrMost;
    options.fields = fields;
    options.sort = sort;
    options.limit = 1;

    return [query, options];
};
