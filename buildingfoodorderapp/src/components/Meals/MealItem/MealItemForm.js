import React from 'react'
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

function MealItemForm(props) {
    return (
        <form className={classes.form}>
            <Input
                label='Amount'
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }} />
            <button>+ Add</button>
        </form >
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


// el Expense controlled Expensefilter componet