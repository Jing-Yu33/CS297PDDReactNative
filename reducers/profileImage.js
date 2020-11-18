const ProfileImageReducer = (state = 0 , action) => {
    switch (action.type) {
        case 'SETPROFILEIMAGEURL' : 
            return action.payload;
        case 'GETPROFILEIMAGEURL' :
            return state;
        default :
            return state;

    }
}
export default ProfileImageReducer;