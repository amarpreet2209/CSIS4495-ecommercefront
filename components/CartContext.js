import {createContext, useEffect, useState} from "react";
import {value} from "lodash/seq";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
    const ls = typeof window !=="undefined" ? window.localStorage : null;
    const [cartProducts, setCartProducts] = useState([]);
    
    useEffect(() => {
        if (cartProducts?.length > 0) {
            ls?.setItem('cart', JSON.stringify(cartProducts));
        }
    },[cartProducts]);
    
    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    },[])
    
    function addProduct(productId) {
        setCartProducts(prev => [...prev,productId]);
    }
    
    function removeProduct(productId) {
        setCartProducts(prev => {
            const pos = prev.indexOf(productId);
            if (pos !== -1) {
                return prev.filter((value, index) => index !== pos);
            }
            return prev;
        });
    }
    
    function clearCart() {
        setCartProducts([]); // Clear cartProducts state
        ls?.removeItem("cart"); // Remove "cart" item from localStorage
        // ls?.setItem("cart", "[]"); // Set the "cart" item to an empty array in localStorage
    }
    
    return (
        <CartContext.Provider value={{cartProducts, setCartProducts, addProduct, removeProduct, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}
