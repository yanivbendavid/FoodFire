import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isValidInput = (value) => value.trim().length !== 0;
const isCorrectPostal = (value) => value.trim().length >= 5;

const Checkout = (props) => {
  const [formValidation, setFormValidation] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const nameInput = useRef();
  const streetInput = useRef();
  const postalInput = useRef();
  const cityInput = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const nameValue = nameInput.current.value;
    const streetValue = streetInput.current.value;
    const postalValue = postalInput.current.value;
    const cityValue = cityInput.current.value;

    const validName = isValidInput(nameValue);
    const validStreet = isValidInput(streetValue);
    const validPostal = isCorrectPostal(postalValue);
    const validCity = isValidInput(cityValue);

    const formIsValid = validName && validStreet && validPostal && validCity;
    setFormValidation({
      name: validName,
      street: validStreet,
      postal: validPostal,
      city: validCity,
    });

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: nameValue,
      street: streetValue,
      postal: postalValue,
      city: cityValue,
    });
  };

  const className = `${classes.control} ${
    !formValidation.name && classes.invalid
  }`;
  const classStreet = `${classes.control} ${
    !formValidation.street && classes.invalid
  }`;
  const classPostal = `${classes.control} ${
    !formValidation.postal && classes.invalid
  }`;
  const classCity = `${classes.control} ${
    !formValidation.city && classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={className}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInput} />
        {!formValidation.name && <p>Invalid Name</p>}
      </div>
      <div className={classStreet}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInput} />
        {!formValidation.street && <p>Invalid Street</p>}
      </div>
      <div className={classPostal}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInput} />
        {!formValidation.postal && <p>Invalid Postal - Should be 5 chars</p>}
      </div>
      <div className={classCity}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInput} />
        {!formValidation.city && <p>Invalid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
