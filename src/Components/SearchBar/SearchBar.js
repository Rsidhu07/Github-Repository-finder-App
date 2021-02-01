import React, { Component } from 'react';
import './SearchBar.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import { updateRepAndOwnerName } from '../../store/actions';

const debounce = (func, del) => { 
    let debounceTimer; 
    return function(){ 
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer); 
            
        debounceTimer = setTimeout(() => func.apply(context, args), del); 
    } 
};

class SearchBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchedText : '',
            results: [],
            loading: false
        };
    }  

    componentWillUnmount(){
       
    }

    onRepClickHandler =(rep) => {
        this.props.onUpdateRepAndOwnerName(rep.name, rep.owner.login);
    }

    onInputChangeHandler = debounce((e)=>{

        if(this.state.results.length === 0){
            this.setState({
                loading:false
            });
        }
        const input = e.target.value.toLowerCase();

        this.setState({
            loading:true
        });

        fetch(`https://api.github.com/search/repositories?q=${input}+language:javascript&sort=stars&order=desc`)
        
            .then(response => response.json())
            .then(result => {
                this.setState({
                    loading:false,
                    results: result.items
                });
            })
        .catch(error => {
            console.log('error while fetching', error);
            this.setState({
                loading:true
            });
        })

    },500);

    render() {
        return (
            <div className='SearchBar'>
                <input type='text' placeholder='Search here for any repository on github with JS used as a language' onChange={(e) =>this.onInputChangeHandler(e)}></input>
                <div className='result-container'>
                    {this.state.loading ? <p>loading...</p> :
                    this.state.results.map((item) => {
                       return ( <p onClick={()=>this.onRepClickHandler(item)} key= {item.id}>
                            {item.has_issues ?<NavLink to={`/issuesView/${item.owner.login}/${item.name}/issues`}>
                            {item.name}</NavLink> : item.name }
                            {!item.has_issues && ' No issues'}
                       </p>)
                    })}
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
        onUpdateRepAndOwnerName:  (repName, ownerName)=>{dispatch(updateRepAndOwnerName(repName,ownerName))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);