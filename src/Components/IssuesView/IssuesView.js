import React, { Component } from 'react';
import './IssuesView.css';
import { withRouter } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { updateIssueNumber } from '../../store/actions';

 class IssuesView extends Component {

    state = {
        issues: [],
        loading: false
    }

    onIssueClickHandler = (issueNumber) =>{
        this.props.onUpdateIssueNumber(issueNumber);
    }

    componentDidMount(){
        
        this.setState({
            loading:true
        });
        let fetchUrl ='';

        if(this.props.ownerName === ''){
           
            const {location} = this.props.history;
            const getRepOwnerNameFromUrl = location.pathname.substring(12);
             fetchUrl = `https://api.github.com/repos/${getRepOwnerNameFromUrl}`;
        } else {
            fetchUrl = `https://api.github.com/repos/${this.props.ownerName}/${this.props.repName}/issues`;
        }
        

        fetch(fetchUrl)
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
                        
                        return (<p onClick = {()=> this.onIssueClickHandler(issue.number)} key ={issue.id} className= {issue.comments > 0 ? 'clickable' : undefined}> 
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

const mapStateToProps = state => {
    return {
        ownerName: state.repOwnerName ,
        repName: state.repName
    }
}

const mapDispatchToProps = dispatch =>{ 
    return {
        onUpdateIssueNumber:  (issueNumber)=>{dispatch(updateIssueNumber(issueNumber))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(IssuesView));