import { Meteor } from 'meteor/meteor';
// import { Accounts } from "meteor/accounts-base";
import UserData from './userData';

Meteor.methods({
    'userData.getLeader': function () {
        const leader = UserData.aggregate([
            { $unwind: '$picks' },
            { $sortByCount: '$_id' },
            { $limit: 1 }
        ]);
        // leader[0].isLeader = leader[0]._id === this.userId;
        return leader;
        // use aggregate
    },
    'userData.createUserSession': function () {
        const currentUser = UserData.find({ _id: this.userId }).fetch();
        const sessionId = new Meteor.Collection.ObjectID()._str;
        if (currentUser && currentUser.length === 0) {
            UserData.insert({
                _id: this.userId,
                sessions: [
                    {
                        sessionId,
                        start: new Date().toISOString(),
                        end: new Date().toISOString()
                    }
                ]
            });
        } else {
            UserData.update(
                { _id: this.userId },
                {
                    $push: {
                        sessions: {
                            sessionId,
                            start: new Date().toISOString(),
                            end: new Date().toISOString()
                        }
                    }
                }
            );
        }
    },
    'userData.userHasPicked': function (compId) {
        const result = UserData.find(
            {
                _id: this.userId,
                picks: {
                    $elemMatch: {
                        comparisonId: compId
                    }
                }
            },
            { fields: { picks: 1 } }
        ).fetch();
        let aOrB;
        if (result.length) {
            result[0].picks.forEach(pick => {
                if (pick.comparisonId === compId) aOrB = pick.pick;
            });
            return aOrB;
        }
        return false;
    },
    'userData.getPicks': function () {
        const result = UserData.find(
            {
                _id: this.userId
            },
            { fields: { _id: 0, 'picks.comparisonId': 1 } }
        ).fetch();
        if (!Object.keys(result[0]).length) return [];
        return result[0].picks.map(pick => pick.comparisonId);
    },
    'userData.updatePicks': function (comparisonId, pick) {
        UserData.update(
            { _id: this.userId },
            {
                $push: {
                    picks: {
                        comparisonId,
                        pick
                    }
                },
                $set: { 'sessions.$.end.-1': new Date().toISOString() }
            }
        );
    },
    // @returns an array containing
    // - an empty array if no sessions exist for any user
    // - an array containing one user id and the number of sessions
    'userData.userWithMostSessions': function () {
        const results = UserData.aggregate([
            { $unwind: '$sessions' },
            { $sortByCount: '$_id' },
            { $limit: 1 }
        ]);
        return results;
    },
    // @returns an array containing userId and highest session time
    // - if no sessions exist, an empty array is returned
    'userData.longestSessionTime': function () {
        const results = UserData.aggregate([
            {
                $unwind: '$sessions'
            },
            {
                $project: {
                    _id: 1,
                    diff: { $subtract: ['$sessions.end', '$sessions.start'] }
                }
            },
            { $sort: { diff: -1 } },
            { $limit: 1 }
        ]);
        return results;
    },
    // @returns a string representing the average time spent across all users
    'userData.averageSessionTime': function () {
        const results = UserData.aggregate([
            {
                $unwind: '$sessions'
            },
            {
                $project: {
                    diff: { $subtract: ['$sessions.end', '$sessions.start'] }
                }
            },
            { $group: { _id: null, avgPerUser: { $avg: '$diff' } } }
        ]);
        return results[0].avgPerUser;
    }
});
