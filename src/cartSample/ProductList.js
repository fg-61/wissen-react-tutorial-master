import React, { useContext, useEffect, useState } from 'react'
import cartContext from '../store/cartContext';
import CartList from './CartList';

function ProductList() {

    console.log('Productlist component rendered!');
    

    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const {cart, setCart} = useContext(cartContext)

    useEffect(() => {

        fetch("https://northwind.vercel.app/api/products")
            .then(res => res.json())
            .then((data) => {
                setProducts(data);
            })

    }, []);

    useEffect(() => {

        let price = 0;
        cart.map((item, key) => {
            price = price + (item.quantity * item.price);
        });

        setTotalPrice(price)

    }, [cart])


    const addToCart = (item) => {

        //Bu ürün sepette var mı?
        var cartProduct = cart.find(q => q.id == item.id);

        if (cartProduct != undefined) {

            cartProduct.quantity = cartProduct.quantity + 1;

            setCart([...cart])

        }
        else {

            let newCartProduct = {
                id: item.id,
                quantity: 1,
                name: item.name,
                price: item.unitPrice
            };

            setCart([...cart, newCartProduct])
        }


    }

    const emptyCart = () => {

        setCart([])

    }

    const removeItem = (id) => {
        var newCartProducts = cart.filter(q => q.id != id);
        setCart([...newCartProducts]);
    }



    return (
        <>
            {/* <h1>Cart count: {cart.length}</h1> */}
            <h1>Total Price:  {totalPrice.toFixed(2)}</h1>
            <button onClick={() => emptyCart()}>Empty Cart</button>

            <CartList remove={removeItem}></CartList>

            <hr></hr>
            <table>
                <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Unit Price</td>
                    <td>Add to Cart</td>
                </tr>

                {
                    products && products.map((item, key) => {
                        return <tr key={key}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.unitPrice}</td>
                            <td><button onClick={() => addToCart(item)}>Add to CART</button></td>
                        </tr>

                    })
                }
            </table>
        </>
    )
}

export default ProductList



// cart = [
//     {
//         id:3,
//         quantity:2,
//         price:50
//     },
//     {
//         id:1,
//         quantity:10,
//         price:500
//     },
// ]
