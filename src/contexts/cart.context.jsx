import { createContext, useEffect, useState } from "react";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const removeItemToCart = (cartItemToRemove, wholeItemRemoval = false) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove, wholeItemRemoval));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemToCart,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
