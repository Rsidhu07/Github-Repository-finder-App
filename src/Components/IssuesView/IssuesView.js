import React, { Component } from 'react';
import './IssuesView.css';
import { withRouter } from 'react-router-dom';
import {NavLink} from 'react-router-dom';

 class IssuesView extends Component {

    state = {
        issues: [],
        loading: false
    }

    componentDidMount(){
        
        this.setState({
            loading:true
        });
        
        const {location} = this.props.history;
        const getRepOwnerNameFromUrl = location.pathname.substring(12);

        console.log('props are ===>>', getRepOwnerNameFromUrl);

        fetch(`https://api.github.com/repos/${getRepOwnerNameFromUrl}`)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    loading:false,
                    issues: result
                });
            }).catch(error => {
            this.setState({
                loading:false
            });
            console.log('error occurred while getting issues', error);
        });
    }

    render() {
        
        return (
            <div className='IssuesView'>
                
                <h3 className='page-title'>Issues List </h3>
                <div className = 'issues-container'> 
                    {this.state.loading ? <h3>Loading Issues....</h3> :
                        this.state.issues.map(issue => {
                        
                        return (<p key ={issue.id} className= {issue.comments > 0 ? 'clickable' : undefined}> 
                        { issue.comments > 0 ? 
                        <NavLink to={`/issueDetails/${issue.repository_url.substring(29)}/issues/${issue.number}/comments`}>
                            {issue.title}</NavLink> :
                        issue.title 
                        }
                            {issue.comments === 0 && ' ( No Comments on this issue).'}</p>);
                        })
                    }

                    {this.state.issues.length === 0 &&
                     <h3 className = 'np-issues-found'>No Issues Found for the Selected Repository</h3>}
                    
                </div>
            </div>
        )
    }
}

export default withRouter(IssuesView);