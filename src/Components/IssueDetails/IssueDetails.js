import React, { Component } from 'react'
import './IssueDetails.css';
import { withRouter } from 'react-router-dom';

class IssueDetails extends Component {

    state = {
        comments: [],
        loading: false
    }
    
    componentDidMount(){
        this.setState({
            loading:true
        });
        
        const { location } = this.props.history;
        const getIssueNumberFromUrl = location.pathname.substring(14);

        fetch(`https://api.github.com/repos/${getIssueNumberFromUrl}`)
            .then(response => response.json())
                .then(result => {
            this.setState({
                loading:false,
                comments: result
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
            <div className='IssueDetails'>
                <h3 className='page-title'>Comments List</h3>
                <div className='comment-container'>
                    {this.state.loading ? <h3> Loading Comments..... </h3> : 
                        <ul>
                            {this.state.comments.map((comment) => {
                            return ( <li key = {comment.id}>
                                    <div className='comment-container-header'>
                                        <p>{comment.user.login}</p> 
                                        <img src ={comment.user.avatar_url} alt='no avatar' height='50px'
                                        width='50px'></img>
                                    </div>
                                    <a href ={comment.html_url}> Click Here To See Comment</a>
                                    </li>
                                );
                            })}
                        </ul>
                    }
                </div>
            </div>
        )
    }
}


export default withRouter(IssueDetails);