import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Roboto", "Roboto Slab", serif, "Work Sans", Inter, Avenir,
    Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  /* color-scheme: light dark; */
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  /* font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* -webkit-text-size-adjust: 100%; */
  }

  * {
  margin: 0;
  font-family: "Roboto";
}
`;

export default GlobalStyle;