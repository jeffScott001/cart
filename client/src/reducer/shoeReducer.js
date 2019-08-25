import {
  LOADING_ITEMS,
  GET_ITEMS,
  GET_DETAILS,
  DISPLAY_SEARCH_BOX,
  GET_CART_ITEMS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CART_VISIBILITY,
  PLACE_ORDER,
  CLEAR_CART,
  SET_FALSE
} from "../actions/types";

const initialState = {
  isLoading: false,
  items: [],
  item: {},
  isVisible: true,
  cart_items: [],
  cart_visible: true,
  Order_success: null,
  cart_cleared: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_ITEMS:
      return {
        ...state,
        isLoading: true
      };
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        isLoading: false
      };
    case GET_DETAILS:
      return {
        ...state,
        item: action.payload,
        isLoading: false
      };
    case DISPLAY_SEARCH_BOX:
      return {
        ...state,
        isVisible: action.payload
      };
    case GET_CART_ITEMS:
      return {
        ...state,
        cart_items: action.payload,
        isLoading: false
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart_items: [action.payload, ...state.cart_items]
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart_items: [
          ...state.cart_items.filter(item => item._id !== action.payload)
        ]
      };
    case CART_VISIBILITY:
      return {
        ...state,
        cart_visible: action.payload
      };
    case PLACE_ORDER:
      return {
        ...state,
        Order_success: action.payload.success
      };
    case CLEAR_CART:
      return {
        ...state,
        cart_cleared: action.payload.cleared
      };
    case SET_FALSE:
      return {
        ...state,
        Order_success: null,
        cart_cleared: null
      };
    default:
      return state;
  }
}
