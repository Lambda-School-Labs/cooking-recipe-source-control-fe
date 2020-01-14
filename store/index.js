import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { authReducer as auth } from "./auth/authReducer";
import { recipeReducer as allRecipes } from "./recipes/recipeReducer";
import { cookbookReducer as cookbook } from "./cookbook/cookbookReducer";
import { singleRecipeReducer as singleRecipe } from "./singleRecipe/singleRecipeReducer";

const rootReducer = combineReducers({
    auth,
    allRecipes,
    cookbook,
    singleRecipe,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));