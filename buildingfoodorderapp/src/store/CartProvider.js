import React, { useReducer } from 'react'
import CartContext from './cart-context'


const defaultCartState = {
    items: [],
    totalAmount: 0
};



const cartReducer = (state, action) => {
    if (action.type === 'ADD') {


        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount; // 0 +22 * 1 = 22

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id // -1 bcz no match found  m1=m1
        );


        const existingCartItem = state.items[existingCartItemIndex]; //undefined / {id..}
        let updatedItems;//undefiend

        //Condition
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount //2
            };
            updatedItems = [...state.items];
            // console.log(updatedItems);   [{…}]
            updatedItems[existingCartItemIndex] = updatedItem;
            // console.log(updatedItems[existingCartItemIndex]); { id: 'm1', name: 'Sushi', amount: 2, price: 22.99}
            // console.log(updatedItem); {id: 'm1', name: 'Sushi', amount: 2, price: 22.99}
        }
        else {
            updatedItems = state.items.concat(action.item) //[{a}]
        }


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