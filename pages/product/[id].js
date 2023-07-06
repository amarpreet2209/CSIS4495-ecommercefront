import Header from "../../components/Header";
import Center from "../../components/Center";
import Title from "../../components/Title";

export default function ProductPage({product}) {
    return (
        <>
            <Header/>
            <Center>
                <Title></Title>
            </Center>
        </>
    )
}

export function getServerSideProps()
