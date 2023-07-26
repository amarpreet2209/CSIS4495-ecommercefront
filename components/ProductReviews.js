import styled from "styled-components";
import Input from "./Input";
import WhiteBox from "./WhiteBox";
import StarsRating from "./StarsRating";

const Title = styled.h2`
    font-size: 1.2rem;
    margin-bottom: 5px;
`;

const Subtitle = styled.h3`
    font-size: 1rem;
    margin-top: 5px;
`;
const ColsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
`;


export default function ProductReviews({product}) {
    return (
        <div>
            <Title>Reviews</Title>
            <ColsWrapper>
                <WhiteBox>
                    <Subtitle>Add Review</Subtitle>
                    Stars: <StarsRating />
                    <Input placeholder={"Title"}/>
                </WhiteBox>
                <WhiteBox>
                    <Subtitle>All Reviews</Subtitle>
                </WhiteBox>
            </ColsWrapper>
        </div>
    )
}
