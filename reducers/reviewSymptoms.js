const ReviewSymptomReducer = (state  = 0, action) => {
    switch (action.type) {
        case 'SETREVIEWSYMPTOMS' : 
            return action.payload;
        case 'GETREVIEWSYMPTOMS' :
            return state;
        default : return state;

    }
}
export default ReviewSymptomReducer;