import axios from "axios";
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
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    CLEAR_ERRORS,
} from "../constants/categoryConstants";

// Get All Categories
export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORIES_REQUEST });

        const { data } = await axios.get('/api/v1/categories');

        dispatch({
            type: ALL_CATEGORIES_SUCCESS,
            payload: data.categories,
        });
    } catch (error) {
        dispatch({
            type: ALL_CATEGORIES_FAIL,
            payload: error.response?.data?.message || "Failed to fetch categories",
        });
    }
};

// Get All Categories ---ADMIN
export const getAdminCategories = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_CATEGORIES_REQUEST });

        const { data } = await axios.get('/api/v1/admin/categories');

        dispatch({
            type: ADMIN_CATEGORIES_SUCCESS,
            payload: data.categories,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_CATEGORIES_FAIL,
            payload: error.response?.data?.message || "Failed to fetch categories",
        });
    }
};

// Create Category ---ADMIN
export const createCategory = (categoryData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_CATEGORY_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post("/api/v1/admin/category/new", categoryData, config);

        dispatch({
            type: NEW_CATEGORY_SUCCESS,
            payload: data.category,
        });
    } catch (error) {
        dispatch({
            type: NEW_CATEGORY_FAIL,
            payload: error.response?.data?.message || "Failed to create category",
        });
    }
};

// Update Category ---ADMIN
export const updateCategory = (id, categoryData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CATEGORY_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(`/api/v1/admin/category/${id}`, categoryData, config);

        dispatch({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: data.category,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload: error.response?.data?.message || "Failed to update category",
        });
    }
};

// Delete Category ---ADMIN
export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/category/${id}`);

        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response?.data?.message || "Failed to delete category",
        });
    }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

