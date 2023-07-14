import Header from "../components/Header";
import Center from "../components/Center";
import {Category} from "../models/Category";
import {Product} from "../models/Product";
import ProductBox from "../components/ProductBox";
import styled from "styled-components";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns:  1fr 1fr;
  gap: 20px;
  
  @media screen and (min-width: 768px) {
    grid-template-columns:  1fr 1fr 1fr 1fr;
  }
`;

const CategoryTitle = styled.h2`
  margin-top: 40px;
  margin-bottom: 10px;
`;

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

export default function CategoriesPage({mainCategories,categoriesProducts}) {
    return (
        <>
            <Header/>
            <Center>
                {mainCategories.map(category => (
                    <CategoryWrapper>
                        <CategoryTitle>{category.name}</CategoryTitle>
                        <CategoryGrid>
                            {categoriesProducts[category._id].map(product => (
                                <ProductBox {...product} />
                            ))}
                        </CategoryGrid>
                    </CategoryWrapper>
                ))}
            </Center>
        </>
    )
}

export async function getServerSideProps() {
    const categories = await Category.find();
    const mainCategories = categories.filter(category => !category.parent);
    const categoriesProducts = {}
    
    for (const mainCategory of mainCategories) {
        
        const mainCategoryId = mainCategory._id.toString();
        
        const childCategoryId = categories
            .filter(category => category?.parent?.toString() === mainCategoryId)
            .map(category =>   category._id.toString())
        
        const categoriesIds = [mainCategoryId, ...childCategoryId];
        
        const products = await Product.find({category: categoriesIds}, null,
            {limit: 3, sort: {_id: -1}});
        
        categoriesProducts[mainCategory._id] = products;
    }
    
    return {
        props: {
            mainCategories: JSON.parse(JSON.stringify(mainCategories)),
            categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts))
        }
    }
}
