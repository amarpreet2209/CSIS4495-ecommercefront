import Header from "../components/Header";
import Center from "../components/Center";
import Title from "../components/Title";
import {signIn, signOut, useSession} from "next-auth/react";
import Button from "../components/Button";
import styled from "styled-components";
import WhiteBox from "../components/WhiteBox";
import {RevealWrapper} from "next-reveal";
import Input from "../components/Input";
import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

const ColsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 40px;
    margin: 40px 0;
`;

export default function AccountPage() {
    
    const {data: session} = useSession();
    // console.log("data", session);
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [country, setCountry] = useState("");
    const [loaded, setLoaded] = useState(false);
    
    const CityHolder = styled.div`
        display: flex;
        gap: 5px;
    `;
    
    async function logout() {
        await signOut({
            callback: process.env.NEXT_PUBLIC_URL
        });
    }
    async function login() {
        await signIn('google');
    }
    
    function saveAddress() {
        const data = {name, email, city, streetAddress, postalCode, country};
        axios.put('/api/address', data);
    }
    
    useEffect(() => {
        axios.get('/api/address').then((response) => {
            setName(response.data?.name);
            setEmail(response.data?.email);
            setCity(response.data?.city);
            setPostalCode(response.data?.postalCode);
            setStreetAddress(response.data?.streetAddress);
            setCountry(response.data?.country);
            setLoaded(true);
        });
    }, []);
    return (
        <>
            <Header/>
            <Center>
                <ColsWrapper>
                    <RevealWrapper delay={0}>
                        <WhiteBox>
                            <h2>Wishlist</h2>
                        </WhiteBox>
                    </RevealWrapper>
                    <RevealWrapper delay={100}>
                        <WhiteBox>
                            <h2>Account Details</h2>
                            {!loaded && (
                                <Spinner fullWidth={true}/>
                            )}
                            {loaded && (
                                <>
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
                                    
                                    <Button black block onClick={saveAddress}>Save</Button>
                                    <hr/>
                                    
                                </>
                            )}
                            {session && (
                                <Button primary onClick={logout}>Logout</Button>
                            )}
                            {!session && (
                                <Button primary onClick={login}>Login</Button>
                            )}
                        </WhiteBox>
                    </RevealWrapper>
                </ColsWrapper>
            </Center>
        </>
    )
}
