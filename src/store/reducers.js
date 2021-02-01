import * as actions from './actions';

const initialState = {
    repOwnerName:'',
    repName: '',
    issueNumber: ''
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case actions.UPDATE_REP_AND_OWNER_NAME:
            return {
                ...state,
                repOwnerName: action.payload.ownerName,
                repName: action.payload.repName
            };

        case actions.UPDATE_ISSUE_NUMBER: 
            return {
                ...state,
                issueNumber: action.issueNumber
            };
            
        default:
            return state;
    }
};

export default reducer;