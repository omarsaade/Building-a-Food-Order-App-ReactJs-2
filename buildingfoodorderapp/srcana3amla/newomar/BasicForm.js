import './BasicForm.css';
import CartContext from '../store/cart-context';
import React, { useContext } from 'react'
import useInput from './hooks/use-input';


const isNotEmpty = value => value.trim() !== '';

const BasicForm = (props) => {



    const { value: firstNameValue,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstName }
        = useInput(isNotEmpty);


    const { value: lastNameValue,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: resetLastName, }
        = useInput(isNotEmpty);



    const cartCtx = useContext(CartContext);
    const hasItems = cartCtx.items.length > 0;

    let formIsValid = false;


    if (firstNameIsValid && lastNameIsValid) {
        formIsValid = true;
    }


    const submitHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }
        // console.log('Submitted');
        console.log(firstNameValue, lastNameValue);
        resetFirstName();
        resetLastName();
    };










    async function addElement() {
        const personalinfo = {
            name: firstNameValue,
            Address: lastNameValue,
            totalAmount: cartCtx.totalAmount,
            list: cartCtx.items
        };
        console.log(personalinfo);
        //fetch can get and post data..not only fetch
        const response = await fetch("https://reactfood-c6f5e-default-rtdb.firebaseio.com/order.json", {
            method: 'POST',//by defauly hye get
            body: JSON.stringify(personalinfo),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
    }




    const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control';
    const lastNameClasses = lastNameHasError ? 'form-control invalid' : 'form-control';


    return (
        <form onSubmit={submitHandler} className="scroll" >
            <div className='control-group'>
                <div className={firstNameClasses}>
                    <label htmlFor='fullname'> Full Name</label>
                    <input type='text' id='fullname'
                        onChange={firstNameChangeHandler}
                        onBlur={firstNameBlurHandler}
                        value={firstNameValue} />
                    {firstNameHasError && <p className='error-text'>Please Enter your Full name.</p>}

                </div>
                <div className={lastNameClasses}>
                    <label htmlFor='address'>Address</label>
                    <input type='text' id='address'
                        onChange={lastNameChangeHandler}
                        onBlur={lastNameBlurHandler}
                        value={lastNameValue} />
                    {lastNameHasError && <p className='error-text'>Please Enter your address</p>}

                </div>
            </div>
            <div className='form-actions'>
                {hasItems && <button disabled={!formIsValid} onClick={addElement}>Order</button>}
                {hasItems && <button onClick={props.onClick}>Cancel</button>}
            </div>
        </form>
    );
};

export default BasicForm;