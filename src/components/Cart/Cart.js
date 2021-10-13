import { useContext, useState, useEffect, useCallback } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const escFunction = useCallback(
    (event) => {
      if (event.keyCode === 27) {
        props.onClose();
      }
    },
    [props]
  );

  useEffect(() => {
    window.addEventListener("keydown", escFunction, false);

    return () => {
      window.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setShowCheckout(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    fetch("https://reactdemo-7f6f1-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: userData, items: cartCtx.items }),
    })
      .then((req) => {
        if (req.ok) {
          setIsSubmitted(true);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsSubmitting(false);
        cartCtx.clearItems();
      });
  };

  const modalCart = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {!showCheckout && modalActions}
    </>
  );

  const submittingModal = <p>Order is processing...</p>;
  const submittedModal = (
    <p>
      Order sent! <button onClick={props.onClose}>Close</button>
    </p>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !isSubmitted && modalCart}
      {isSubmitting && !isSubmitted && submittingModal}
      {!isSubmitting && isSubmitted && submittedModal}
    </Modal>
  );
};

export default Cart;
