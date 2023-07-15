import styled from "styled-components";
import {ButtonStyle} from "./Button";
import {primary} from "../lib/colors";
import FlyingButtonOriginal from "react-flying-item"
import {useContext} from "react";
import {CartContext} from "./CartContext";

const FlyingButtonWrapper= styled.div`
  button {
    ${ButtonStyle};
    background-color: transparent;
    border: 1px solid ${primary};
    color: ${primary};
  }
`;

export default function FlyingButton(props) {
    const {addProduct} = useContext(CartContext);
    
    return (
        <FlyingButtonWrapper onClick={() => addProduct(props._id)}>
            <FlyingButtonOriginal
                targetTop={'5%'}
                targetLeft={'95%'}
                flyingItemStyling={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '60px',
                    maxHeight: '60px',
                    borderRadius: 0
                }}>
                
            </FlyingButtonOriginal>
        </FlyingButtonWrapper>
    )
   
}
