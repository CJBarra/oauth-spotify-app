import { css } from "styled-components/macro";

const variables = css`
  :root {
    --accent-highlight: #1ee665;
    --accent-color: #1ed760;
    --dark-grey: #191919; // background-color (REF: rgb(25, 25, 25)).
    --dark-grey-faded: rgba(16, 16, 16, 0.9);
    --mid-grey: #414141;
    --light-grey: #737373;
    
    /* font */
    --font: 'Roboto', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
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