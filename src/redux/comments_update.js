import * as ActionTypes from './ActionTypes';

export const CommentsReducer = (
    state = {
        isLoading: true,
        errMsg: null,
        comments: []
    }, action) => {
    switch (action.type) {

        case ActionTypes.ADD_COMMENT:
            return { ...state, comments: state.comments.concat(action.payload) };

        case ActionTypes.ADD_COMMENTS:
            return { ...state, isLoading: false, errMsg: null, comments: action.payload };

        case ActionTypes.COMMENTS_LOADING:
            return { ...state, isLoading: true, errMsg: null, comments: [] };

        case ActionTypes.COMMENTS_FAILED:
            return { ...state, isLoading: false, errMsg: action.payload, comments: [] };

        default:
            return state;
    }
};