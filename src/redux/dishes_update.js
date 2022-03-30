import * as ActionTypes from './ActionTypes';

export const DishesReducer = (
    state = {
        isLoading: true,
        errMsg: null,
        dishes: []
    },
    action) => {
    console.log('DishesReducer: ' + action.type);
    switch (action.type) {

        case ActionTypes.ADD_DISHES:
            console.assert(Array.isArray(action.payload) && action.payload.length > 0);
            return { ...state, isLoading: false, errMsg: null, dishes: action.payload };

        case ActionTypes.DISHES_LOADING:
            return { ...state, isLoading: true, errMsg: null, dishes: [] };

        case ActionTypes.DISHES_FAILED:
            return { ...state, isLoading: false, errMsg: action.payload, dishes: [] };

        default:
            return state;
    }
};