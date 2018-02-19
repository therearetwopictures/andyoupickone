// Methods related to comparisons
import { Meteor } from 'meteor/meteor';
import Comparisons from './comparisons.js';
import {
    downloadImage,
    getGCSUrl,
    getUniqueImgNameFromSeed,
    error403
} from '../helpers/imageUtils.js';
import { createLeastOrMostPopular } from '../helpers/queryCreators';

import { getUrl } from '../helpers/comparisonUtils';
import { classifyImage } from './watsonHelpers/watson';

const watsonSettings = Meteor.settings.watson;

Meteor.methods({
    'comparisons.flagError': function (compId) {
        Comparisons.update(compId, { $inc: { errorCount: 1 } });
    },
    'comparisons.getByCompId': function (compId) {
        const hasSeen = Meteor.call('userData.userHasPicked', compId);

        const result = Comparisons.find(compId, {
            field: {
                A: 1,
                B: 1,
                urlB: 1,
                urlA: 1
            }
        }).fetch();
        result[0].hasSeen = hasSeen;
        return result;
    },
    'comparisons.getRandOne': function () {
        const picks = Meteor.call('userData.getPicks');
        const random = Comparisons.aggregate([
            { $match: { _id: { $not: { $in: picks } } } },
            { $sample: { size: 1 } },
            {
                $project: {
                    A: 1,
                    B: 1,
                    urlB: 1,
                    urlA: 1
                }
            }
        ]);
        return random;
    },
    'comparisons.addOne': async function () {
        const [urlA, seedA, fileTypeA] = await getUrl();
        const [urlB, seedB, fileTypeB] = await getUrl();

        const compId = new Meteor.Collection.ObjectID()._str;

        const gcsUrlA = getUniqueImgNameFromSeed(compId, seedA, 'A', fileTypeA);
        const gcsUrlB = getUniqueImgNameFromSeed(compId, seedB, 'B', fileTypeB);
        try {
            await downloadImage(urlA, gcsUrlA);
            await downloadImage(urlB, gcsUrlB);
        } catch (e) {
            if (!error403) Meteor.call('comparisons.addOne');
            console.log(e, 'hey, nice catch!!~');
            return;
        }

        await Comparisons.insert({
            _id: compId,
            urlA: getGCSUrl(gcsUrlA),
            seedA,
            urlB: getGCSUrl(gcsUrlB),
            seedB
        });
    },
    'comparisons.updatePicks': function (compId, pick) {
        if (pick && compId) {
            let update = {};
            const inc = {};
            inc[pick] = 1;
            update = { $inc: inc };
            Comparisons.update(
                {
                    _id: compId
                },
                update
            );
        }
    },
    // @retuns an array containing 2 elements:
    // - sum of times A has been picked
    // - sum of times B has been picked
    'comparisons.getAVB': function () {
        const query = Comparisons.aggregate([
            {
                $group: {
                    _id: null,
                    sumA: { $sum: '$A' },
                    sumB: { $sum: '$B' }
                }
            }
        ]);
        return query;
    },
    // @returns an array of results:
    // - empty in the case no picks have been made in the db
    // - array of one or more results (limited to 1)
    // nb: excludes results that have an even match of 0
    'comparisons.getEvenComparison': function () {
        const query = Comparisons.aggregate([
            {
                $group: {
                    _id: { urlA: '$urlA', urlB: '$urlB', A: '$A', B: '$B' }
                }
            },
            {
                $project: {
                    totalAB: { $eq: ['$_id.A', '$_id.B'] },
                    sumAB: { $sum: ['$_id.A', '$_id.B'] }
                }
            },
            { $sort: { totalAB: -1 } },
            {
                $match: {
                    $and: [{ totalAB: { $eq: true } }, { sumAB: { $ne: 0 } }]
                }
            },
            { $sort: { sumAB: -1 } },
            { $project: { totalAB: 0 } },
            { $limit: 1 }
        ]);
        return query;
    },
    // @returns an array of results:
    // - empty in the case no picks have been made in the db
    // - array of one result (the first one if there are multiples w/same)
    // limited to 1, if multiples exist
    'comparisons.getMostPopularComparison': function () {
        const query = Comparisons.aggregate([
            {
                $group: {
                    _id: { urlA: '$urlA', urlB: '$urlB', A: '$A', B: '$B' }
                }
            },
            { $project: { totalAB: { $sum: ['$_id.A', '$_id.B'] } } },
            { $sort: { totalAB: -1 } },
            { $limit: 1 }
        ]);
        return query;
    },
    // @returns an array or results:
    // - empty in the case no picks have been made in the db
    // - array with both results in the case where the lowest picks are equal
    // - array of one result
    'comparisons.getLeastPopularImage': function () {
        let query = createLeastOrMostPopular('A', 1);
        const getLeastPopularImageA = Comparisons.find(
            query[0],
            query[1]
        ).fetch();

        query = createLeastOrMostPopular('B', 1);
        const getLeastPopularImageB = Comparisons.find(
            query[0],
            query[1]
        ).fetch();

        // Rare edge case where nothing has been picked in the db at all
        if (
            getLeastPopularImageA[0].A === null &&
            getLeastPopularImageB[0].B === null
        ) {
            return [];
        } else if (getLeastPopularImageA[0].A === getLeastPopularImageB[0].B) {
            // Case where highest A and B are equal
            return [getLeastPopularImageA[0], getLeastPopularImageB[0]];
        }

        return getLeastPopularImageA[0].A > getLeastPopularImageB[0].B
            ? getLeastPopularImageA
            : getLeastPopularImageB;
    },
    //
    // @returns an array of results:
    // - empty in the case of no picks made in the db
    // - array with both results in the case where highest picks are equal
    // - array of one result of either A or B
    'comparisons.getMostPopularImage': function () {
        let query = createLeastOrMostPopular('A', -1);
        const getMostPopularImageA = Comparisons.find(
            query[0],
            query[1]
        ).fetch();

        query = createLeastOrMostPopular('B', -1);
        const getMostPopularImageB = Comparisons.find(
            query[0],
            query[1]
        ).fetch();

        // Rare edge case where nothing has been picked in the db at all
        if (
            getMostPopularImageA[0].A === null &&
            getMostPopularImageB[0].B === null
        ) {
            return [];
        } else if (getMostPopularImageA[0].A === getMostPopularImageB[0].B) {
            // Case where highest A and B are equal
            return [getMostPopularImageA[0], getMostPopularImageB[0]];
        }

        return getMostPopularImageA[0].A > getMostPopularImageB[0].B
            ? getMostPopularImageA
            : getMostPopularImageB;
    },
    // Generate image tags. No arguments, makes database query inside function
    // Function returns undefined as it is solely for updating database
    'comparisons.classifyImage': function () {
        const comps = Comparisons.find({ tagsA: null }, { limit: 30 }).fetch();
        console.log(comps);
        comps.forEach(comp => {
            for (let i = 0; i < 2; i += 1) {
                let img = '';
                let url = '';
                img = i < 1 ? 'A' : 'B';
                url = i < 1 ? comp.urlA : comp.urlB;
                console.log('url:', url);

                const defaultParameters = {
                    api_key: watsonSettings.api_key2,
                    imageurl: url,
                    use_unauthenticated: false
                };

                classifyImage(defaultParameters)
                    .then(results => {
                        const tags = `tags${img}`;
                        results.images[0].classifiers[0].classes.forEach(
                            tag => {
                                Comparisons.update(
                                    { _id: comp._id },
                                    {
                                        $push: {
                                            [tags]: {
                                                class: tag.class,
                                                score: tag.score
                                            }
                                        }
                                    }
                                );
                            }
                        );
                    })
                    .catch(error => console.log(error.message));
            }
        });
    }
});
