import styled from "styled-components";
import {format} from "date-fns-tz";

const StyledOrder = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  
  display: flex;
  gap: 20px;
  align-items: center;
  
  time {
    font-size: 1rem;
    font-weight: bold;
    color: #555;
  }
  
`;

const ProductRow = styled.div`
  span {
    color: #aaa;
  }
`;

const Address = styled.div`
    font-size: 0.8rem;
    line-height: 1rem;
    margin-top: 5px;
    color: #888;
`;

function formatDate(date) {
    const vancouverTimezone = 'America/Vancouver';
    return format(date, 'MM/dd/yyyy, h:mm:ss a', {timeZone: vancouverTimezone});
}
export default function SingleOrder({line_items, createdAt, ...rest}) {
    return (
        <StyledOrder>
            <div>
                <time>{formatDate(new Date(createdAt))}</time>
                <Address>
                    {rest.name} <br/>
                    {rest.email} <br/>
                    {rest.streetAddress} <br/>
                    {rest.postalCode} {rest.city}, {rest.country}
                </Address>
            </div>
            <div>
                {line_items.map(item => (
                    <ProductRow key={item.price_data.product_data.name}>
                        <span>{item.quantity} x </span>
                        {item.price_data.product_data.name}
                    </ProductRow>
                ))}
            </div>
        </StyledOrder>
    )
}
