import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import SingleStat from '../../components/SingleStat';
import InsightsNavBar from '../../components/InsightsNavBar';
import Comparisons from '../../../api/comparisons/comparisons';
import Loading from '../../components/loading/';

class SingleStatsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            urlA: null,
            urlB: null,
            pickedA: null,
            pickedB: null,
            id: null
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            loading: nextProps.loading,
            urlA: nextProps.comparisons[0].urlA,
            urlB: nextProps.comparisons[0].urlB,
            pickedA: nextProps.comparisons[0].A,
            pickedB: nextProps.comparisons[0].B,
            id: nextProps.comparisons[0]._id
        });
    }
    render() {
        if (this.state.loading) {
            return <Loading />;
        }

        return (
            <div>
                <InsightsNavBar />
                <SingleStat
                    urlA={this.state.urlA}
                    urlB={this.state.urlB}
                    pickedA={this.state.pickedA}
                    pickedB={this.state.pickedB}
                    id={this.state.id}
                />
            </div>
        );
    }
}

export default withTracker(props => {
    const results = Meteor.subscribe('comparisons.byCompId', props.compId);
    return {
        loading: !results.ready(),
        comparisons: Comparisons.find({}).fetch()
    };
})(SingleStatsContainer);
