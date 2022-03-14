import React, { useContext } from 'react'
import cartContext from '../store/cartContext'

function CartList(props) {

    console.log('Cart list component rendered!');
    
    const { cart } = useContext(cartContext)

    return (
        <>
                        {
                <ul>
                    {
                        cart && cart.map((item,key) => {
                           return <li key={key}>
                               {item.name} - {item.quantity} * {item.price.toFixed(2)} = {(item.quantity * item.price).toFixed(2)}
                               <button onClick={() => props.remove(item.id)}>Remove Item</button>
                           </li>
                        })
                    }
                </ul>
               
            }
        </>
    )
}

export default CartList
