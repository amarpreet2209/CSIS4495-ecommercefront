import Header from "../../components/Header";
import Center from "../../components/Center";
import {Category} from "../../models/Category";
import {Product} from "../../models/Product";
import ProductsGrid from "../../components/ProductsGrid";
import Title from "../../components/Title";
import styled from "styled-components";

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h1 {
    font-size: 1.5em
  }
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const Filter = styled.div`
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;

  display: flex;
  gap: 5px;
`;


export default function CategoryPage({category, products}) {
    return (
        <>
            <Header/>
            <Center>
                <CategoryHeader>
                    <h1>{category.name}</h1>
                    <FiltersWrapper>
                        {category.properties.map(prop => (
                            <Filter>
                                <span>{prop.name}</span>
                                <select>
                                    {prop.values.map(val => (
                                        <option value={val}>{val}</option>
                                    ))}
                                </select>
                            </Filter>
                        ))}
                    </FiltersWrapper>
                    
                </CategoryHeader>
                
                
                <ProductsGrid products={products}/>
            </Center>
        </>
    )
}

export async function getServerSideProps(context) {
    const category = await Category.findById(context.query.id);
    const subCategories = await Category.find({parent: category._id});
    
    const catIds = [category._id, ...subCategories.map(c => c._id)];
    const products = await Product.find({category: catIds});
    
    return {
        props: {
            category: JSON.parse(JSON.stringify(category)),
            products: JSON.parse(JSON.stringify(products))
        }
    }
}
