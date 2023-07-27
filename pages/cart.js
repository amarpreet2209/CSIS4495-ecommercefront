import Header from "../components/Header";
import styled from "styled-components";
import Center from "../components/Center";
import Button from "../components/Button";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "../components/CartContext";
import axios from "axios";
import Table from "../components/Table";
import Input from "../components/Input";
import {RevealWrapper} from "next-reveal";
import {useSession} from "next-auth/react";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 40px;
  
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2){
    text-align: right;
  }

  table tr.subtotal td {
    padding: 15px 0;
  }
  
  table tbody tr.subtotal td:nth-child(2) {
    font-size: 1.4rem;
  }
  
  tr.total td {
    font-weight: bold;
  }
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
  width: 70px;
  height: 100px;
  padding: 2px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 60px;
    max-height: 60px;
  }

  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;

export default function CartPage() {
    
    const {data: session} = useSession();
    
    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [country, setCountry] = useState("");
    const [orderSuccess, setOrderSuccess] = useState(false);
    
    const [shippingFee, setShippingFee] = useState(null);
    
    
    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', {ids: cartProducts})
                .then(response => {
                    setProducts(response.data)
                });
        } else {
            setProducts([])
        }
       
        
    },[cartProducts]);
    
    useEffect(() => {
        
        if (!session) {
            return;
        }
        
        axios.get('/api/address').then((response) => {
            setName(response.data?.name);
            setEmail(response.data?.email);
            setCity(response.data?.city);
            setPostalCode(response.data?.postalCode);
            setStreetAddress(response.data?.streetAddress);
            setCountry(response.data?.country);
        });
        
    },[session])
    
    function moreOfThisProduct(id) {
        addProduct(id);
    }
    
    function lessOfThisProduct(id) {
        removeProduct(id);
    }
    
    let productsTotal = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        productsTotal += price;
    }
    
    async function goToPayment() {
        const response = await axios.post('/api/checkout', {
            name, email, city, postalCode, streetAddress, country, cartProducts
        });
        // redirect to stripe url
        if (response.data.url) {
                window.location = response.data.url;
        }
    }
    
    
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        
        if (window?.location?.href?.includes("success")) {
            clearCart(); // Clear the cart when the payment is successful
            setOrderSuccess(true);
        }
        
        axios.get('/api/settings?name=shippingFee').then(res => {
            setShippingFee(res.data.value);
        })
    }, []);
    
    
    if (orderSuccess) {
        return (
            <>
                <Header/>
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h1>Thanks for your order!</h1>
                            <p>
                                We will email you when your order will be sent.
                            </p>
                        </Box>
                    </ColumnsWrapper>
                </Center>
            </>
        )
    }
    
    
   
    
    return (
        <>
            <Header></Header>
            <Center>
                <ColumnsWrapper>
                    <RevealWrapper delay={0}>
                        <Box>
                            <h2>Cart</h2>
                            {!cartProducts?.length && (
                                <div>Your cart is empty!</div>
                            )}
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
                                        <tr key={product._id}>
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
                                    <tr className={"subtotal"}>
                                        <td colSpan={2}>Products</td>
                                        <td>${productsTotal}</td>
                                    </tr>
                                    <tr className={"subtotal"}>
                                        <td colSpan={2}>Shipping</td>
                                        <td>${shippingFee}</td>
                                    </tr>
                                    <tr className={"subtotal total"}>
                                        <td colSpan={2}>Total</td>
                                        <td>${parseInt(productsTotal || 0) + parseInt(shippingFee || 0)}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            )}
                        </Box>
                    </RevealWrapper>
                    
                    {!!cartProducts?.length && (
                        <RevealWrapper delay={100}>
                            <Box>
                                <h2>Order Information</h2>
                                <Input
                                    type="text"
                                    placeholder="Name"
                                    name={"name"}
                                    value={name}
                                    onChange={(ev) => setName(ev.target.value)}
                                />
                                <Input
                                    type="text"
                                    placeholder="Email"
                                    name={"email"}
                                    value={email}
                                    onChange={(ev) => setEmail(ev.target.value)}
                                />
                                
                                <CityHolder>
                                    <Input
                                        type="text"
                                        placeholder="City"
                                        name={"city"}
                                        value={city}
                                        onChange={(ev) => setCity(ev.target.value)}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Postal Code"
                                        name={"postalCode"}
                                        value={postalCode}
                                        onChange={(ev) => setPostalCode(ev.target.value)}
                                    />
                                </CityHolder>
                                
                                <Input
                                    type="text"
                                    placeholder="Street Address"
                                    name={"streetAddress"}
                                    value={streetAddress}
                                    onChange={(ev) => setStreetAddress(ev.target.value)}
                                />
                                <Input
                                    type="text"
                                    placeholder="Country"
                                    name={"country"}
                                    value={country}
                                    onChange={(ev) => setCountry(ev.target.value)}
                                />
                                <input
                                    type="hidden"
                                    name="products"
                                    value={cartProducts.join(',')} />
                                <Button black block onClick={goToPayment}>Continue to payment</Button>
                            </Box>
                        </RevealWrapper>
                        
                    )}
                </ColumnsWrapper>
            </Center>
        </>
    );
}
