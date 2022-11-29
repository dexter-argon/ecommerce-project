


export const addCartItem = (cartItems, productToAdd) => {
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