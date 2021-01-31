import './App.css';
import React, { Component } from 'react'
import SearchBar from './Components/SearchBar/SearchBar';
import { Route } from 'react-router-dom';
import IssuesView from './Components/IssuesView/IssuesView';
import IssueDetails from './Components/IssueDetails/IssueDetails';

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <Route path = '/' exact>
          <SearchBar/>
        </Route>
        <Route path='/issuesView'>
          <IssuesView />
        </Route>
        <Route path='/issueDetails'>
          <IssueDetails />
        </Route>
      </div>
    );
  }
}


