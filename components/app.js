import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import CamperList from './table-list.js';
import CamperListItem from './table-items.js';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recentCampers: [],
            allTimeCampers: [],
            currentView: 'recentCampers'
        };
    }
    
    componentWillMount() {
        axios.all([this.fetchRecentCampers(), this.fetchAllTimeCampers()])
            .then(axios.spread((recentCampers, allTimeCampers) => {
              this.setState({ 
                  recentCampers: recentCampers.data, 
                  allTimeCampers: allTimeCampers.data 
              });    
            }));
    }
    
    fetchRecentCampers() {
        return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
    }
    
    fetchAllTimeCampers() {
        return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
    }
    
    changeView(currentView) {
        this.setState({ currentView });
    }
    
    render() {
        return (
            <div>
                <h1 className="text-center">{`Displaying ${this.state.currentView}`}</h1>
                <div className="wrapper text-center">
                    <button onClick= {() => this.changeView('recentCampers')} className="btn btn-default">Recent</button>
                    <button onClick= {() => this.changeView('allTimeCampers')} className="btn btn-default">All Time</button>
                </div>
                <CamperList campers={this.state[this.state.currentView]} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('render-target'));