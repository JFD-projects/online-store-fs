import usersReducer from "./users";
import productsReducer from "./products";
import categoriesReducer from "./categories";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  users: usersReducer,
  products: productsReducer,
  categories: categoriesReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
