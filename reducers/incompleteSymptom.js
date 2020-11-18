const IncompleteSymptomReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SETINCOMPLETESYMPTOMS' : 
            return action.payload;
        case 'GETINCOMPLETESYMPTOMS' :
            return state;
        default : return state;

    }
}
export default IncompleteSymptomReducer;