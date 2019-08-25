import {
  GET_ITEMS,
  LOADING_ITEMS,
  GET_DETAILS,
  DISPLAY_SEARCH_BOX,
  GET_CART_ITEMS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CART_VISIBILITY,
  PLACE_ORDER,
  CLEAR_CART,
  SET_FALSE
} from "./types";
import Axios from "axios";
import { tokenConfig } from "./authActions";

export const getItems = () => dispatch => {
  dispatch(loadItems());
  Axios.get("/api/shoes").then(res => {
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    });
  });
};

export const getDetails = id => dispatch => {
  dispatch(loadItems());
  dispatch(searchBoxVisible(false));
  Axios.get(`/api/shoes/${id}`).then(res =>
    dispatch({
      type: GET_DETAILS,
      payload: res.data
    })
  );
};

export const loadItems = () => dispatch => {
  dispatch({
    type: LOADING_ITEMS
  });
};

//Protected Routes
export const getCartItems = () => (dispatch, getState) => {
  const loggedin = getState().auth.isAuthenticated;
  if (loggedin) {
    dispatch(pushToDataBase(getState));
    Axios.get(`/api/cart`, tokenConfig(getState)).then(res =>
      dispatch({
        type: GET_CART_ITEMS,
        payload: res.data
      })
    );
  } else {
    if (localStorage.getItem("cart_items")) {
      const items = JSON.parse(localStorage.getItem("cart_items"));
      dispatch({
        type: GET_CART_ITEMS,
        payload: items
      });
    }
  }
};

export const addToCart = item => (dispatch, getState) => {
  if (localStorage.getItem("cart_items")) {
    const items = JSON.parse(localStorage.getItem("cart_items"));
    items.push(item);
    localStorage.setItem("cart_items", JSON.stringify(items));
  } else {
    const items = [item];
    localStorage.setItem("cart_items", JSON.stringify(items));
  }
  if (getState().auth.isAuthenticated) {
    dispatch(pushToDataBase(getState));
  } else {
    dispatch({
      type: ADD_TO_CART,
      payload: item
    });
  }
};

export const pushToDataBase = () => (dispatch, getState) => {
  if (localStorage.getItem("cart_items")) {
    const items = localStorage.getItem("cart_items");
    Axios.post("/api/cart", items, tokenConfig(getState)).then(res => {
      dispatch({
        type: GET_CART_ITEMS,
        payload: res.data
      });
      localStorage.removeItem("cart_items");
    });
  }
};

export const removeFromCart = id => (dispatch, getState) => {
  const loggedin = getState().auth.isAuthenticated;
  console.log(loggedin);
  if (loggedin) {
    Axios.delete(`/api/cart/${id}`, tokenConfig(getState))
      .then(res => dispatch({ type: REMOVE_FROM_CART, payload: id }))
      .catch(err => console.log(err));
  } else {
    console.log(id);
    const items = JSON.parse(localStorage.getItem("cart_items"));
    const array = items.filter(item => item._id !== id);
    localStorage.setItem("cart_items", JSON.stringify(array));
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  }
};

export const placeOrder = details => (dispatch, getState) => {
  const detail = JSON.stringify(details);
  Axios.post("/api/order", detail, tokenConfig(getState)).then(res => {
    dispatch({
      type: PLACE_ORDER,
      payload: res.data
    });
    dispatch(clearCart(details.ordered_items));
  });
};

export const clearCart = items => (dispatch, getState) => {
  items.forEach(item => {
    Axios.delete(`/api/order/${item._id}`, tokenConfig(getState)).then(res => {
      dispatch({
        type: CLEAR_CART,
        payload: res.data
      });
      dispatch(getCartItems());
    });
  });
};

export const setFalse = () => dispatch => {
  dispatch({
    type: SET_FALSE
  });
};
export const cartVisibility = bool => dispatch => {
  dispatch({
    type: CART_VISIBILITY,
    payload: bool
  });
};
export const searchBoxVisible = bool => dispatch => {
  dispatch({ type: DISPLAY_SEARCH_BOX, payload: bool });
};
