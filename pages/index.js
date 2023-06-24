import Head from 'next/head';
import Header from "../components/Header";
import Featured from "../components/Featured";
import {Product} from "../models/Product";
import {mongooseConnect} from "../lib/mongoose";
import NewProducts from "../components/NewProducts";


export default function Home({featuredProduct, newProducts}) {
  return (
      <div>
        <Header/>
        <Featured product={featuredProduct}/>
          <NewProducts products={newProducts}/>
      </div>
  )
}

/*
* Special Function
* fetching data on the server side before rendering page.
* */
export async function getServerSideProps() {
    const featuredProductId = '6483b0b5e8298969cd29ba55';
    await mongooseConnect();
    const featuredProduct = await Product.findById(featuredProductId);
    const newProducts = await Product.find({}, null,
        {sort: {'_id':-1}, limit: 10}
    );
    return {
        props: {
            featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
            newProducts: JSON.parse(JSON.stringify(newProducts)),
        }
    };
}
