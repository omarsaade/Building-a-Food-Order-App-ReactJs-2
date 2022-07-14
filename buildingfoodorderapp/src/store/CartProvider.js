import React, { useReducer } from 'react'
import CartContext from './cart-context'


const defaultCartState = {
    items: [],
    totalAmount: 0
};



//reducer function
//(prevstate,action)
const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedItems = state.items.concat(action.item);//[{a}]
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount; // 0 + 22 * 2 = 44
        return {
            items: updatedItems, //[{a}]
            totalAmount: updatedTotalAmount // 44
        };
    }
    return defaultCartState; //fadye
}

// useReducer is usually preferable to useState when you have complex state 
// logic that involves multiple sub - values or when the next state depends on the previous one.

function CartProvider(props) {


    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    //const [state, dispatchFn] = useReducer(reducerFn, initialState);


    const addItemToCartHandler = (item) => {
        // eersel action jdide men 5ilel dispatch 3anda type..
        dispatchCartAction({ type: 'ADD', item: item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id })
    };


    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };



    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider