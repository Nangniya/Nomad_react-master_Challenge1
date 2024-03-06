import * as S from "./Coins.styles";
import { Link } from "react-router-dom";
import { fetchCoins } from "../api";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../../atoms";

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <S.Container>
      <S.Header>
        <div style={{ width: "20%" }}></div>
        <S.Title>코인</S.Title>
        <S.ToggleButton onClick={toggleDarkAtom}>Toggle Mode</S.ToggleButton>
      </S.Header>
      {isLoading ? (
        <S.Loader>Loading...</S.Loader>
      ) : (
        <S.CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <S.Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <S.Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name} &rarr;{" "}
              </Link>
            </S.Coin>
          ))}
        </S.CoinsList>
      )}
    </S.Container>
  );
}
export default Coins;
