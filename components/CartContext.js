import {createContext, useState} from "react";

const CartContext = createContext({});

export function CartContextProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]);
    return (
        <CartContext.Provider value={{cartProducts}}>
            {children}
        </CartContext.Provider>
    )
}
