import styled from "styled-components";
import Input from "./Input";
import WhiteBox from "./WhiteBox";
import StarsRating from "./StarsRating";
import Textarea from "./Textarea";
import Button from "./Button";
import {useState} from "react";

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
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    
    function submitReview() {
        
    }
    
    return (
        <div>
            <Title>Reviews</Title>
            <ColsWrapper>
                <WhiteBox>
                    <Subtitle>Add a Review</Subtitle>
                    <div>
                        <StarsRating onChange={() => {}} />
                    </div>
                    <Input
                        value={title}
                        onChange={(ev) => setTitle(ev.target.value)}
                        placeholder={"Title"} />
                    <Textarea
                        value={description}
                        onChange={(ev) => setDescription(ev.target.value)}
                        placeholder={"Was it good? Pros? Cons? "}/>
                    
                    <div>
                        <Button primary onClick={submitReview}>Submit your review</Button>
                    </div>
                    
                </WhiteBox>
                <WhiteBox>
                    <Subtitle>All Reviews</Subtitle>
                </WhiteBox>
            </ColsWrapper>
        </div>
    )
}
