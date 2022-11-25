import { createContext, useReducer} from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const found = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  let modifiedCartItems = cartItems.map((cartItem) => {
    if (cartItem.id === productToAdd.id) {
      cartItem.quantity += 1;
    }
    return cartItem;
  });

  // if found, increment quantity
  if (!found) {
    modifiedCartItems = [
      ...modifiedCartItems,
      { ...productToAdd, quantity: 1 },
    ];
  }
  // return new array with modified cartItems/new cart item
  return modifiedCartItems;
};

const removeCartItem = (cartItems, productToRemove, wholeItemRemoval) => {
  return cartItems.filter((cartItem) => {
    if (cartItem.id === productToRemove.id) {
      cartItem.quantity = wholeItemRemoval ? 0 : cartItem.quantity - 1;
    }
    return cartItem.quantity !== 0;
  });
};

const CART_ACTION_TYPES = {
  'SET_CART_ITEMS': 'SET_CART_ITEMS',
  'SET_IS_CART_OPEN': 'SET_IS_CART_OPEN',
}
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  cartTotal: 0,
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const CartReducer = (state, action) => {
  const { type, payload } = action;
  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN: 
      return {
        ...state,
        isCartOpen: payload,
      }
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`); 
    }
}

export const CartProvider = ({ children }) => {
  const [ {cartItems, isCartOpen, cartTotal, cartCount}, dispatch] = useReducer(CartReducer, INITIAL_STATE);
  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const updateCartItemsReducer = (newCartItems) => {
    console.log(`updateCartItemsReducers newCartItems`)
    console.log(newCartItems);
    let newCartCount, newCartTotal;
    if(newCartItems) { 
      newCartCount = 0;
      newCartTotal = 0;
    }
    else { 
      newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price, 0); 
      newCartCount = newCartItems.reduce(
        (total, cartItem) => total + cartItem.quantity, 0);
    }
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { 
          cartItems: newCartItems,
          cartTotal: newCartTotal,
          cartCount: newCartCount,
        }) 
    );
  }
  const setIsCartOpen = (state) => { 
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, state)); 
  }

  const removeItemToCart = (cartItemToRemove, wholeItemRemoval = false) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove, wholeItemRemoval);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemToCart,
    cartTotal,
    cartCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
