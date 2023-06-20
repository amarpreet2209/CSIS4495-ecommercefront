import Head from 'next/head';
import Header from "../components/Header";
import Featured from "../components/Featured";
import {Product} from "../models/Product";
import {mongooseConnect} from "../lib/mongoose";


export default function Home({product}) {
  return (
      <div>
        <Header/>
        <Featured product={product}/>
      </div>
  )
}

export async function getServerSideProps() {
    const featuredProductId = '6483b0b5e8298969cd29ba55';
    await mongooseConnect();
    const product = await Product.findById(featuredProductId);
    
    return {
        props: {product: JSON.parse(JSON.stringify(product))}
    };
}
