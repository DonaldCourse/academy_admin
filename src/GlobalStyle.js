import { createGlobalStyle } from "styled-components";

export const Globalstyled = createGlobalStyle`
*, *:before, *:after {
    box-sizing: border-box;
  }
    html,body{
      overflow-x:hidden; 
        margin:0px;
        height: 100%;
        font-family: 'Helvetica Neue', Helvetica,"Open sans", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        ::-webkit-scrollbar {
          display: none;
        }
    }
`;
