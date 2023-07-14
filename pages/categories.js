import Header from "../components/Header";
import Center from "../components/Center";
import {Category} from "../models/Category";
import {Product} from "../models/Product";

export default function CategoriesPage({mainCategories,categoriesProducts}) {
    return (
        <>
            <Header/>
            <Center>
                {mainCategories.map(category => (
                    <div>
                        <h2>{category.name}</h2>
                        <div>
                            {categoriesProducts[category._id].map(product => (
                                <div>{product.title}</div>
                            ))}
                        </div>
                    </div>
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
            .map(category =>   category._id)
        
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
