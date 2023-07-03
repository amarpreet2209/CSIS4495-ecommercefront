import Header from "../components/Header";
import styled from "styled-components";
import {mongooseConnect} from "../lib/mongoose";
import {Product} from "../models/Product";
import ProductsGrid from "../components/ProductsGrid";
import Center from "../components/Center";

const Title = styled.h1`
  font-size: 1.5rem;
`;

export default function ProductsPage({products}) {
    return (
        <>
            <Header/>
            <Center>
                <Title>All Products</Title>
                <ProductsGrid products={products}/>
            </Center>
        </>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();
    const products =  await Product.find({}, null, {sort: {'_id': -1}})
    return {
        props: {
            products: JSON.parse(JSON.stringify(products))
        }
    }
}

