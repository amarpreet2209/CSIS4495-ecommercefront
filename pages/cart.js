import Header from "../components/Header";
import styled from "styled-components";
import Center from "../components/Center";
import Button from "../components/Button";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "../components/CartContext";
import axios from "axios";
import Table from "../components/Table";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell= styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 80px;
    max-height: 80px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 3px;
`;

export default function CartPage() {
    const {cartProducts, addProduct, removeProduct} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', {ids: cartProducts})
                .then(response => {
                    setProducts(response.data)
                });
        }
    },[cartProducts])
    
    function moreOfThisProduct(id) {
        addProduct(id);
    }
    
    function lessOfThisProduct(id) {
        removeProduct(id);
    }
    
    return (
        <>
            <Header></Header>
            <Center>
                <ColumnsWrapper>
                    <Box>
                        {!cartProducts?.length && (
                            <div>Your cart is empty!</div>
                        )}
                        <h2>Cart</h2>
                        {products?.length > 0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product =>(
                                        <tr>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img src={product.images[0]} alt={""}/>
                                                </ProductImageBox>
                                                {product.title}
                                            </ProductInfoCell>
                                            <td>
                                                <Button
                                                     onClick={() => lessOfThisProduct(product._id)}
                                                 >-</Button>

                                                <QuantityLabel>
                                                {cartProducts
                                                    .filter(id =>  id=== product._id)
                                                    .length
                                                }
                                                </QuantityLabel>

                                                <Button
                                                    onClick={() => moreOfThisProduct(product._id)
                                                }>+</Button>
                                            </td>
                                            <td>${cartProducts
                                                .filter(id =>  id=== product._id)
                                                .length * product.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Box>
                    {!!cartProducts?.length && (
                        <Box>
                            <h2>Order Information</h2>
                            <input type={"text"} placeholder={"Address"}/>
                            <input type={"text"} placeholder={"Address 2"}/>
                            <Button black block>Continue to payment</Button>
                        </Box>
                    )}
                </ColumnsWrapper>
            </Center>
        </>
    );
}
