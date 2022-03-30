import { applyMiddleware, combineReducers, createStore } from "redux";
import { createForms } from "react-redux-form";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { DishesReducer } from "./dishes_update";
import { Comments } from "./comments";
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";
import { InitialFeedback } from "./forms";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: DishesReducer,
            comments: Comments,
            leaders: Leaders,
            promos: Promotions,
            ...createForms({
                feedback: InitialFeedback,
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};