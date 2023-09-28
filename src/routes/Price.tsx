import { useQuery } from "react-query";
import { fetchCoinTickers } from "./api";
import styled from "styled-components";

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: number;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Table = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    padding: 10px;
    p {
      width: 25%;
      display: flex;
      align-items: flex-end;
    }
    span {
      flex-grow: 1;
      font-weight: bold;
      color: hotpink;
      font-size: 25px;
    }
  }
`;

function Price({ coinId }: PriceProps) {
  const { data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  return (
    <Table>
      <div>
        <p>Price : </p>
        <span>{tickersData?.quotes.USD.price.toFixed(3).toLocaleString()}</span>
      </div>
      <div>
        <p>ATH Price: </p>
        <span>
          ${tickersData?.quotes.USD.ath_price.toFixed(3).toLocaleString()}
        </span>
      </div>
      <div>
        <p>Market Cap: </p>
        <span>${tickersData?.quotes.USD.market_cap.toLocaleString()}</span>
      </div>
    </Table>
  );
}
export default Price;
