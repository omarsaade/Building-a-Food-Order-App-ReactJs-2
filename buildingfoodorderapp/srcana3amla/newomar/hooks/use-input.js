import React, { useState } from 'react'

function useInput(ValidateValue) {

    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    // (value) => value.trim() !== ''   ValidateValue
    const valueIsValid = ValidateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;


    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value);
    }


    const inputBlurHandler = (event) => {
        setIsTouched(true);
    }

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }


    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };
};

export default useInput