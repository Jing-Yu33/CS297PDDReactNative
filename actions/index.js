export const setUserInfo = (data) => {
    return {
        type : "SET",
        payload : data    
    }
}
export const getUserInfo = (data = undefined) => {
    return {
        type : "GET",
        payload : data    
    }
}

export const setProfileImageUrl = (data) => {
    return {
        type : "SETPROFILEIMAGEURL",
        payload : data    
    }
}
export const getProfileImageUrl = (data = undefined) => {
    return {
        type : "GETPROFILEIMAGEURL",
        payload : data    
    }
}

export const getIncompleteSymptoms = (data = undefined) => {
    return {
        type : "GETINCOMPLETESYMPTOMS",
        payload : data    
    }
}

export const setIncompleteSymptoms = (data = undefined) => {
    return {
        type : "SETINCOMPLETESYMPTOMS",
        payload : data    
    }
}

export const getReviewSymptoms = (data = undefined) => {
    return {
        type : "GETREVIEWSYMPTOMS",
        payload : data    
    }
}

export const setReviewSymptoms = (data = undefined) => {
    return {
        type : "SETREVIEWSYMPTOMS",
        payload : data    
    }
}