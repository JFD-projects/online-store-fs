import { createAction, createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";
import productService from "../services/product.service";

const initialState = localStorageService.getAccessToken() ? {
  entities: null,
  isLoading: true,
  error: null,
  isLoggedIn: true,
  dataLoaded: false
} : {
  entities: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
  dataLoaded: false
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsRequested: (state) => {
      state.isLoading = true;
    },
    productsReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    productsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    productCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    productUpdated: (state, action) => {
      const index = state.entities.findIndex(product => action.payload._id === product._id);
      state.entities[index] = action.payload;
    },
    productLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.dataLoaded = false;
    },
    authRequested: (state) => {
      state.error = null;
    },
    productRemoved: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    }
  }
});

const {
  reducer: productsReducer,
  actions
} = productsSlice;
const {
  productsRequested,
  productsReceived,
  productsRequestFailed,
  productCreated,
  productUpdated,
  productRemoved
} = actions;

const productCreateRequested = createAction("product/productCreateRequested");
const createProductFailed = createAction("product/createProductFailed");
const productUpdateRequested = createAction("product/productUpdateRequested");
const updateProductFailed = createAction("product/updateProductFailed");
const productRemoveRequested = createAction("user/commentRemoveRequested");

export const createProduct = (payload) => async (dispatch) => {
  dispatch(productCreateRequested());
  try {
    const { content } = await productService.create(payload);
    dispatch(productCreated(content));
  } catch (error) {
    dispatch(createProductFailed(error.message));
  }
};

export const updateProduct = (payload) => async (dispatch) => {
  dispatch(productUpdateRequested());
  try {
    const { content } = await productService.update(payload);
    dispatch(productUpdated(content));
  } catch (error) {
    dispatch(updateProductFailed(error.message));
  }
};

export const removeProduct = (id) => async (dispatch) => {
  dispatch(productRemoveRequested());
  try {
    await productService.remove(id);
    dispatch(productRemoved(id));
  } catch (error) {
    dispatch(productsRequestFailed(error.message));
  }
};

export const loadProductsList = () => async (dispatch, getState) => {
  dispatch(productsRequested());
  try {
    const { content } = await productService.get();
    dispatch(productsReceived(content));
  } catch (error) {
    dispatch(productsRequestFailed(error.message));
  }
};

export const getProducts = () => (state) => state.products.entities;
export const getCurrentProductData = () => (state) => {
  return state.products.entities ? state.products.entities.find((u) => u._id === state.products.auth.productId) : null;
};
export const getProductById = (productId) => (state) => {
  if (state.products.entities) {
    return state.products.entities.find(u => u._id === productId);
  }
  return [];
};

export const getDataStatus = () => state => state.products.dataLoaded;
export const getProductsLoadingStatus = () => state => state.products.isLoading;
export const getCurrentProductId = () => state => state.products.auth.productId;

export default productsReducer;
