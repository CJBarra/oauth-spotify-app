import { createGlobalStyle } from "styled-components";
import variables from './variables'

const GlobalStyle = createGlobalStyle`
  ${variables};

  html {
    box-sizing: border-box;
  }

  *,  *::before, *::after {
    box-sizing: inherit;
  }

  body {
    background-color: var(--dark-grey);
    width: 100%;
    max-width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    color: var(--font-black);
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 var(--sm);
    letter-spacing: -0.02em;
    color: var(--font-white);
  }

  a, button {
    color: inherit;
    transition: all 250ms ease;
  }

  a {
    text-decoration: none;
  }

  button {
    background-color: var(--dark-grey-faded);
    border: 0;
    border-radius: var(--lg);
    padding: var(--xs) var(--sm);
    font-weight: 600;
    font-family: inherit;
    color: var(--font-white);

    &:hover, &:focus {
      background-color: var(--mid-grey);
      outline: 0;
    }
  }

  img {
    width:100%;
    max-width: 100%;
    vertical-align: middle;
  }

  main {
    position: relative;
    padding: 60px 0;
  }

  .app {
    min-height: 100vh;
  }

  .overflow-ellipsis {
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: unset;
    word-break: break-all;
  }
`
export default GlobalStyle