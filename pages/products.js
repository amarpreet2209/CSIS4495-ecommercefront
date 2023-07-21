import Header from "../components/Header";
import styled from "styled-components";
import {mongooseConnect} from "../lib/mongoose";
import {Product} from "../models/Product";
import ProductsGrid from "../components/ProductsGrid";
import Center from "../components/Center";
import Title from "../components/Title";
import {getServerSession} from "next-auth";
import {authOptions} from "./api/auth/[...nextauth]";
import {WishedProduct} from "../models/WishedProduct";


export default function ProductsPage({products, wishedProducts}) {
    return (
        <>
            <Header/>
            <Center>
                <Title>All Products</Title>
                <ProductsGrid products={products} wishedProducts={wishedProducts}/>
            </Center>
        </>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const products =  await Product.find({}, null, {sort: {'_id': -1}})
    
    // getting current user info from ServerSession
    const {user} = await getServerSession(context.req, context.res, authOptions);
    
    const wishedProducts = await WishedProduct.find({
        userEmail: user.email,
        product: products.map(p => p._id.toString())
    })
    
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
            wishedProducts: wishedProducts.map(i => i.product.toString())
        }
    }
}

