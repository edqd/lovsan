import styled from "styled-components";

export default styled.button`
  border-radius: 999rem;
  padding: 0.2rem 0.6rem;
  font-size: 1rem;
  border-color: transparent;
  background: white;
  color: black;
  filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))
    drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
  cursor: pointer;
  margin: 0 0.1rem;

  &:hover {
    background-color: rgb(245 208 254);
  }

  &:disabled {
    background: none;
    cursor: auto;
    color: rgb(140 140 140);
    filter: none;
  }

  &:active {
    background-color: rgb(240 171 252);
  }
`;
