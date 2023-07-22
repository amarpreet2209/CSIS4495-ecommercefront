import styled from "styled-components";
import {format} from "date-fns-tz";

const StyledOrder = styled.div`
  margin: 5px 0;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
`;

const ProductRow = styled.div`
  span {
    color: #aaa;
  }
`;

function formatDate(date) {
    const vancouverTimezone = 'America/Vancouver';
    return format(date, 'MM/dd/yyyy, h:mm:ss a', {timeZone: vancouverTimezone});
}
export default function SingleOrder({line_items, createdAt}) {
    return (
        <StyledOrder>
            <time>{formatDate(new Date(createdAt))}</time>
            {line_items.map(item => (
                <ProductRow>
                    <span>{item.quantity} x </span>
                    {item.price_data.product_data.name}
                </ProductRow>
            ))}
        </StyledOrder>
    )
}
