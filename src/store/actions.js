export const UPDATE_REP_AND_OWNER_NAME = 'UPDATE_REP_AND_OWNER_NAME';
export const UPDATE_ISSUE_NUMBER = 'UPDATE_ISSUE_NUMBER';

export const updateRepAndOwnerName = (repName,ownerName)=>{

    return {
        type: UPDATE_REP_AND_OWNER_NAME,
        payload: {
            repName,
            ownerName
        }
    };
};

export const updateIssueNumber = (issueNumber) => {
    return {
        type: UPDATE_ISSUE_NUMBER,
        issueNumber: issueNumber
    };
};