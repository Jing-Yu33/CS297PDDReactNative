import {combineReducers} from 'redux'
import UserInfoReducer from './userinfo'
import ProfileImageReducer from './profileImage'
import IncompleteSymptomReducer from './incompleteSymptom';
import ReviewSymptomReducer from './reviewSymptoms';

const allReducers = combineReducers({
    userInfo : UserInfoReducer,
    profileImageUrl : ProfileImageReducer,
    numIncompleteSymptoms :IncompleteSymptomReducer,
    numReviewSymptoms : ReviewSymptomReducer,
});
export default allReducers;