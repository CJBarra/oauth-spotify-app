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

    font-family: var(--font);
    color: var(--font-black);

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 var(--sm);
    color: var(--font-white);
    letter-spacing: -0.02em;
  }

  a, button {
    color: inherit;
    transition: all 250ms ease;
  }

  a {
    text-decoration: none;
  }

  button {
    background-color: var(--darker-grey-faded);
    border: 0;
    border-radius: var(--lg);
    padding: var(--xs) var(--sm);
    font-weight: 600;
    font-family: inherit;
    color: var(--font-white);
    transition: all 240ms ease;

    &:hover, &:focus {
      cursor: pointer;
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
  
  .mainMask {
    background-image: linear-gradient(rgba(16, 16, 16, 0.15) 0, rgba(25, 25, 25, 1));
    position: absolute;
    width: 100%;
    height: 264px;
    margin-top: -64px;
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

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .empty {
    color: var(--grey);
    font-size: var(--fz-lg);
    text-align: center;
    padding: var(--spacing-xxl);
  }
`
export default GlobalStyle