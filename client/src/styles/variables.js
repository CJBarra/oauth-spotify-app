import { css } from "styled-components/macro";

const variables = css`
  :root {
    --accent-highlight: #1ee665; // rgb(30, 230, 101)
    --accent-color: #00c257; // rgb(0, 215, 96)
    --dark-grey: #191919; // background-color (REF: rgb(25, 25, 25)).
    --darker-grey-faded: rgba(16, 16, 16, 0.9);
    --mid-grey: #414141;
    --light-grey: #737373;
    
    /* font */
    --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    --font-black: #0a0a0a;
    --font-light-grey: #adadad;
    --font-white: #eeeeee;
    
    /* sizings */
    --site-max-width: 1300px;

    --xs: 8px;
    --sm: 12px;
    --md: 16px;
    --lg: 24px;
    --xl: 32px;

    --rad-rounded: 4px;
    --rad-pill: 20px;
  }
`
export default variables;

