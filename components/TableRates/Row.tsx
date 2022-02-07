import styled from "styled-components";

export const Row = styled.button<{ active: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1.125rem;
  border-color: transparent;
  padding: 0.3rem 0.7rem;
  background-color: ${(props) => (props.active ? "rgb(250 232 255)" : "white")};
  cursor: pointer;

  &:hover {
    background-color: rgb(245 208 254);
  }

  &:active {
    background-color: rgb(240 171 252);
  }
`;

export const Price = styled.div`
  display: flex;
  align-items: end;
`;

export const UnitPrice = styled.div`
  width: 6.5rem;
  float: right;
  text-align: right;
`;
