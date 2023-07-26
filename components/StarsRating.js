import StarOutline from "./icons/StarOutline";
import styled from "styled-components";
import {useState} from "react";
import StarSolid from "./icons/StarSolid";
import {primary} from "../lib/colors";

const StarsWrapper = styled.div`
    display: inline-flex;
    gap: 1px;
    align-items: center;
    position: relative;
    top: 2px;
`;
const StarWrapper = styled.button`
  height: 1.4rem;
  width : 1.4rem;
  cursor: pointer;
  padding: 0;
  border: 0;
  display: inline-block;
  background-color: transparent;
  color: ${primary};
`;

export default function StarsRating({defaultHowMany=0, onChange=() => {}}) {
    const [howMany, setHowMany] = useState(defaultHowMany);
    const five = [1,2,3,4,5];
    
    function handleStarClick(n) {
        setHowMany(n);
        onChange(n);
    }
    
    
    return (
        <div>
            {five.map(n => (
                <StarWrapper onClick={() => handleStarClick(n)}>
                    {howMany >= n ? <StarSolid/> : <StarOutline/>}
                </StarWrapper>
            ))}
        </div>
    )
}
