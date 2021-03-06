import { applyMiddleware, combineReducers, createStore } from "redux";
import { createForms } from "react-redux-form";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { DishesReducer } from "./dishes_update";
import { CommentsReducer } from "./comments_update";
import { LeadersReducer } from "./leaders_update";
import { PromotionsReducer } from "./promotions_update";
import { InitialFeedback } from "./forms";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: DishesReducer,
            comments: CommentsReducer,
            leaders: LeadersReducer,
            promos: PromotionsReducer,
            ...createForms({
                feedback: InitialFeedback,
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};