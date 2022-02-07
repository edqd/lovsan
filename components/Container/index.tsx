import styled from "styled-components";

export { default as Background } from "./Background";
export { default as Main } from "./Main";
export { default as Emphasis } from "./Emphasis";

export const sizes = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

export default styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 1rem;

  @media (min-width: ${sizes.sm}) {
    max-width: ${sizes.sm};
  }
`;
