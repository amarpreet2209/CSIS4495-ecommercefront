import Header from "../../components/Header";
import Center from "../../components/Center";
import Title from "../../components/Title";
import {mongooseConnect} from "../../lib/mongoose";
import {Product} from "../../models/Product";
import styled from "styled-components";
import WhiteBox from "../../components/WhiteBox";

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: .8fr 1.2fr;
    gap: 40px;
    margin-top: 40px;
`;


export default function ProductPage({product}) {
    return (
        <>
            <Header/>
            <Center>
                <ColWrapper>
                    <WhiteBox>
                        <img style={{maxWidth: '100%'}} src={product.images?.[0]} alt={""}/>
                    </WhiteBox>
                    <div>
                        <Title>{product.title}</Title>
                        <p>{product.description}</p>
                    </div>
                    
                </ColWrapper>
               
            </Center>
        </>
    )
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    
    const {id} = context.query;
    const product = await Product.findById(id);
    
    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        }
    }
}
