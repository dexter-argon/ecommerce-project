import { ReactComponent as ShoppingIcon } from "../../assests/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";
import "./cart-icon.styles.scss";
import { useContext } from "react";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);

  const totalQuantity = cartItems.reduce(
    (total, currItem) => total + currItem.quantity,
    0
  );

  const toggleIsCartDropDown = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleIsCartDropDown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{totalQuantity}</span>
    </div>
  );
};

export default CartIcon;
