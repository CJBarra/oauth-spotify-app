import styled from "styled-components/macro";

const StyledGrid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(133px, 1fr));
  grid-template-rows: 1fr;
  grid-gap: var(--md);
  margin: 0;
  padding: 0;
  overflow-y: hidden;

  .singleRow {
    grid-auto-rows: 0;
    grid-gap: 0 var(--md);
  }

  .grid__item {
    background-color: var(--darker-grey-faded);
    border-radius: var(--rad-rounded);
    transition: background-color 250ms ease;
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: var(--mid-grey);

      img {
        box-shadow: 0 8px 24px rgb(0 0 0 / 50%);
      }
    }

    a {
      display: block;
      width: 100%;
      height: 100%;

      &:hover,
      &:focus {
        text-decoration: none;
      }
    }
  }

  .grid__item__inner {
    padding: var(--sm);
  }

  .grid__item__img {
    position: relative;
    padding-top: 100%;
    margin: 0 auto var(--md);

    img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: var(--dark-grey);
      border-radius: ${props => props.type === 'artist' ? '50%' : '2px'};
    }
  }

  .grid__item__name {
    margin: 0 0 6px;
    font-size: 0.8rem;
    letter-spacing: normal;
  }

  .grid__item__label {
    margin-top: 0;
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--font-light-grey);
  }
`

export default StyledGrid;