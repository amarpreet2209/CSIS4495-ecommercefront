import Center from "./Center";
import styled from "styled-components";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`

const Title = styled.h1`
  margin:0;
  font-weight: normal;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;


export default function Featured() {
    return (
        <Bg>
            <Center>
                <Wrapper>
                    <Column>
                        <div>
                            <Title>Pro anywhere</Title>
                            <Desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt id nunc sed consectetur. Interdum et malesuada fames ac ante ipsum primis in faucibus.</Desc>
                        </div>
                    </Column>
                    <Column>
                        <img src='https://149426355.v2.pressablecdn.com/wp-content/uploads/2021/10/mbp-2021-bbedit-lede.png'  alt=""/>
                    </Column>
                </Wrapper>
            </Center>
        </Bg>
    )
}
