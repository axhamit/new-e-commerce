import {
    ALL_CATEGORIES_REQUEST,
    ALL_CATEGORIES_SUCCESS,
    ALL_CATEGORIES_FAIL,
    ADMIN_CATEGORIES_REQUEST,
    ADMIN_CATEGORIES_SUCCESS,
    ADMIN_CATEGORIES_FAIL,
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_FAIL,
    NEW_CATEGORY_RESET,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_RESET,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_RESET,
    CLEAR_ERRORS,
} from "../constants/categoryConstants";

const initialState = {
    categories: [],
    loading: false,
    error: null,
    isCreated: false,
    isUpdated: false,
    isDeleted: false,
};

export const categoriesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ALL_CATEGORIES_REQUEST:
        case ADMIN_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
                categories: [],
            };

        case ALL_CATEGORIES_SUCCESS:
        case ADMIN_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: payload,
            };

        case ALL_CATEGORIES_FAIL:
        case ADMIN_CATEGORIES_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };

        case NEW_CATEGORY_REQUEST:
        case UPDATE_CATEGORY_REQUEST:
        case DELETE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isCreated: true,
                categories: [...state.categories, payload],
            };

        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true,
                categories: state.categories.map((cat) =>
                    cat._id === payload._id ? payload : cat
                ),
            };

        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: true,
                categories: state.categories.filter((cat) => cat._id !== payload),
            };

        case NEW_CATEGORY_FAIL:
        case UPDATE_CATEGORY_FAIL:
        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };

        case NEW_CATEGORY_RESET:
            return {
                ...state,
                isCreated: false,
            };

        case UPDATE_CATEGORY_RESET:
            return {
                ...state,
                isUpdated: false,
            };

        case DELETE_CATEGORY_RESET:
            return {
                ...state,
                isDeleted: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

