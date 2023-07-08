import styled from "styled-components";

export default function ProductImages({images}) {
    
    const Image = styled.img`
        max-width: 100%;
        max-height: 100%;
    `;
    
    const ImageButtons = styled.div`
      display: flex;
      gap: 10px;
      flex-grow: 0;
      margin-top: 10px;
    `;
    
    const ImageButton = styled.div`
      border: 2px solid #ccc;
      height:  40px;
      padding: 2px;
      cursor: pointer;
      border-radius: 5px;
      //mix-blend-mode: inherit;
    `;
    
    return (
        <>
            <Image src={images?.[0]} alt={""}/>
            <ImageButtons>
                {images.map(image => (
                    <ImageButton>
                        <Image src={image} alt={""} />
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    )
}
