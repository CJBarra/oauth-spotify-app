import styled from "styled-components/macro";

const StyledSection = styled.section`
  &:first-of-type { 
    .section__inner {
      padding-top: 0;
    }
  }

  .section__inner {
    width: 100%;
    max-width: var(--site-max-width);
    margin: 0 auto;
    position: relative;
    padding: var(--lg) var(--md);

    @media (min-width: 768px) {
      padding: var(--lg) 64px;
    }
  }

  .section__top {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin-bottom: var(--xl);
  }

  .section__heading {
    display: flex;
    margin: 0;
    font-size: 1.5rem;

    &:hover, &:focus {
      text-decoration: underline;
    }
  }

  .section__breadcrumb {
    display: flex;
    color: var(--font-light-grey);

    &::after {
      content: '/';
      display: block;
      margin: 0 var(--sm);
    }

    a {
      &:hover, &:focus {
        color: var(--font-white);
      }
    }
  }

  .section__see-all {
    display: flex;
    align-items: flex-end;
    text-transform: uppercase;
    color: var(--light-grey);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    padding-bottom: 2px;

    &:hover, &:focus {
      text-decoration: underline;
    }
  }
`

export default StyledSection;