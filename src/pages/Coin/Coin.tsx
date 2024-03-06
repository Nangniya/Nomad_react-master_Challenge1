import { Link, useLocation, useParams, useRouteMatch } from "react-router-dom";
import { Switch, Route } from "react-router";
import * as S from "./Coin.styles";
import Chart from "../Chart/Chart";
import Price from "../Price/Price";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { ToggleButton } from "../Coins/Coins.styles";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../../atoms";

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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

function Coin() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickerLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const loading = infoLoading || tickerLoading;
  return (
    <S.Container>
      <title>
        {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
      </title>
      <S.Header>
        <S.GoHome>
          <Link to="/">◀</Link>
        </S.GoHome>
        <S.Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </S.Title>
        <ToggleButton onClick={toggleDarkAtom}>Toggle Mode</ToggleButton>
      </S.Header>
      {loading ? (
        <S.Loader>Loading...</S.Loader>
      ) : (
        <>
          <S.Overview>
            <S.OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </S.OverviewItem>
            <S.OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </S.OverviewItem>
            <S.OverviewItem>
              <span>Price:</span>
              <span>
                {tickersData?.quotes.USD.price.toFixed(3) ? "Yes" : "No"}
              </span>
            </S.OverviewItem>
          </S.Overview>
          <S.Description>{infoData?.description}</S.Description>
          <S.Overview>
            <S.OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </S.OverviewItem>
            <S.OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </S.OverviewItem>
          </S.Overview>

          <S.Tabs>
            <S.Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </S.Tab>
            <S.Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </S.Tab>
          </S.Tabs>

          <Switch>
            <Route path="/:coinId/price">
              <Price coinId={coinId} />
            </Route>
            <Route path="/:coinId/chart">
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </S.Container>
  );
}
export default Coin;
