import React, { useContext } from 'react'
import cartContext from '../store/cartContext'

function CartHeader() {

    console.log('Cart header component rendered!');

    const {cart,setCart} = useContext(cartContext)

    return (
        <>
             <h1>Cart count: {cart.length}</h1>
        </>
    )
}

export default CartHeader
