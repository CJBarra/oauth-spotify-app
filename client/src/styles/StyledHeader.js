import styled from "styled-components/macro";

const StyledHeader = styled.header`
  background: linear-gradient(rgba(30, 230, 101, 0.9), rgba(30, 230, 101, 0.4));
  background-color: var(--mid-grey);
  position: relative;
  display: flex;
  align-items: flex-end;
  height: 30vh;
  max-height: 500px;
  min-height: 250px;
  margin-bottom: var(--lg);
  color: var(--font-white);

  @media (min-width: 768px) {
    /* min-height: 33vh; */
  }

  &:after {
    content: '';
    background-color: var(--mid-grey);
    background-image: linear-gradient(rgba(30, 230, 101, 0.4), rgba(25, 25, 25, 1));
    position: absolute;
    display: block;
    top: 100%;
    width: 100%;
    height: 20vh;
    z-index: -1;
  }

  .header__inner {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: var(--site-max-width);
    margin: 0 auto;
    padding: var(--lg) var(--md) 0;

    @media (min-width: 768px) {
      padding: var(--lg) var(--lg) 0;
    }
  }

  img.header__img {
    background-color: var(--dark-grey);
    width: 100%;
    max-width: 160px;
    min-width: 120px;
    margin-right: var(--lg);
    box-shadow: 0 4px 60px rgb(0 0 0 / 50%);
    border-radius: ${props => props.type === 'user' ? '50%' : 0};

    &:hover, &:focus {
      cursor: pointer;
    }
  }

  .header__user__profile-group {
    cursor: default;
  }

  .header__overline {
    text-transform: uppercase;
    font-size: 0.65rem;
    font-weight: 700;
    margin-bottom: var(--xs);
  }

  h1.header__name {
    font-size: clamp(2.5rem, 9vw, 6rem);
    line-height: 1;
    margin: 0 0 var(--xs) 0;

    @media (min-width: 768px) {
      margin: 0 0 var(--lg) -5px;
    }
  }

  .header__meta {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 600;
    margin: 0;

    span {
      display: flex;
      align-items: center;

      &:not(:last-of-type)::after {
        content: '•';
        display: block;
        margin: 0 var(--xs);
        font-size: 0.5rem;
      }
    }
  }
`

export default StyledHeader;