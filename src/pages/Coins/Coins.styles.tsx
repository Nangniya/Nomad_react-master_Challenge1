import styled from "styled-components";

export const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

export const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CoinsList = styled.ul``;

export const Coin = styled.li`
  border: 3px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  align-self: center;
`;

export const Loader = styled.span`
  text-align: center;
  display: block;
`;

export const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

export const ToggleButton = styled.button`
  width: 20%;
  background-color: ${(props) => props.theme.bgColor};
  border: 2px solid ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
`;
