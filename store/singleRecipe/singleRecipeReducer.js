import {
    START_FETCH_RECIPE,
    FETCH_RECIPE_SUCCESS,
    FETCH_RECIPE_FAILURE,
    RESET_RECIPE,
    EDIT_INGRED,
    START_EDIT,
    STOP_EDIT,
    EDIT_TITLE,
} from "./singleRecipeActions";

const initState = {
    recipe: {
        ancestor: null,
        categories: [],
        id: null,
        img: null,
        ingredients: [],
        innovator: null,
        innovator_name: null,
        minutes: null,
        notes: null,
        steps: [],
        title: null,
        total_saves: null,
    },
    isLoading: false,
    error: null,
    editing: false,
};

export const singleRecipeReducer = (state = initState, action) => {
    switch (action.type) {
        case START_FETCH_RECIPE:
            return {
                ...state,
                error: null,
                isLoading: true,
            };
        case FETCH_RECIPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                recipe: action.payload,
            };
        case FETCH_RECIPE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case EDIT_INGRED:
            const ingredients = state.recipe.ingredients.map((val, i) => {
                if (i === action.index) {
                    return action.payload;
                } else return val;
            });
            return { ...state, recipe: { ...state.recipe, ingredients } };
        case EDIT_TITLE:
            return {
                ...state,
                recipe: { ...state.recipe, title: action.payload },
            };
        case START_EDIT:
            return { ...state, editing: true };
        case STOP_EDIT:
            return { ...state, editing: false };
        case RESET_RECIPE:
            return initState;

        default:
            return state;
    }
};
