import styled from "styled-components";

export const Input = styled.input`
  border-radius: 999rem;
  padding: 0.2rem 0.6rem;
  font-size: 1rem;
  border-color: transparent;
  background: white;
  margin-right: 0.25rem;

  &:focus {
    box-shadow: 0 0 0 2px rgb(192 38 211);
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px rgb(192 38 211);
  }
  outline: none;

  &::placeholder {
    color: rgb(203 213 225);
  }
`;

export const Error = styled.div`
  color: rgb(136 19 55);
  font-size: 0.8rem;
`;
