import { CartContext } from "../../contexts/cart.context";
import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount,
} from "./cart-icon.styles.jsx";
import { useContext } from "react";

function CartIcon() {
  const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);

  const totalQuantity = cartItems.reduce(
    (total, currItem) => total + currItem.quantity,
    0
  );
  const toggleIsCartDropDown = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartDropDown}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{totalQuantity}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
