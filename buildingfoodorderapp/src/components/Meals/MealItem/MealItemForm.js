import React, { useRef, useState } from 'react'
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';



function MealItemForm(props) {
    //validation
    const [amountIsValid, setAmountIsValid] = useState(true);
    //ref
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();//temna3 reloading the page
        // amountInputRef.current hik 3al 7ell hye el input
        const enteredAmount = amountInputRef.current.value;//the value is always a string so we can converted to a number
        const enteredAmountNumber = +enteredAmount;
        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredAmountNumber);
    };




    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={amountInputRef} label='Amount'
                input={{ id: 'amount_' + props.id, type: 'number', min: '1', max: '5', step: '1', defaultValue: '1' }} />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount(1-5).</p>}
        </form>
    )
}

export default MealItemForm


// In React, defaultValue is used with uncontrolled form components whereas value is used
//  with controlled form components.They should not be used together in a form
//  element.
// expenses  satet1 meth
//   expensesFilter state1 meth
//   expensesItem


// expensesfilter bet3bat el value  men 5ilel
// onchange lal parents li hye fia w bterja3 el parents btarje3la yeha men 5ilel props


// el Expense controlled Expensefilter component