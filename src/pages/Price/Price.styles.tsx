import styled from "styled-components";

export const Table = styled.div`
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
