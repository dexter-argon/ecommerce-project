import { createContext, useState } from "react";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };
  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
