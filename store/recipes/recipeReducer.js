import {
    START_FETCH_RECIPES,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAILURE,
    ADD_RECIPE,
} from "./recipeActions";

const initState = {
    recipeList: [],
    isLoading: true,
    error: null,
};

export const recipeReducer = (state = initState, action) => {
    switch (action.type) {
        case START_FETCH_RECIPES:
            return {
                ...state,
                error: null,
                isLoading: true,
            };
        case FETCH_RECIPES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                recipeList: action.payload,
            };
        case FETCH_RECIPES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case ADD_RECIPE:
            return {
                ...state,
                recipeList: [...state.recipeList, action.payload],
            };
        default:
            return state;
    }
};
