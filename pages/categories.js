import Title from "../components/Title";
import Header from "../components/Header";
import Center from "../components/Center";
import {Category} from "../models/Category";

export default function CategoriesPage({categories}) {
    return (
        <>
            <Header/>
            <Center>
                {categories.map(category => (
                    <div>
                        <h2>{category.name}</h2>
                    </div>
                ))}
            </Center>
        </>
    )
}

export async function getServerSideProps() {
    const categories = await Category.find();
    
    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories))
        }
    }
}
