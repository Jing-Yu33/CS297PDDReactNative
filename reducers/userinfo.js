const UserInfoReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SET' : 
            return action.payload;
        case 'GET' :
            return state;
        default : return state;

    }
}
export default UserInfoReducer;