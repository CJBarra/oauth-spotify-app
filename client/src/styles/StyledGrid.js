import styled from "styled-components/macro";

const StyledGrid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: 1fr;
  grid-auto-rows: 0;
  grid-gap: 0 var(--md);
  margin: 0;
  padding: 0;
  overflow-y: hidden;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(179px, 1fr));
    grid-gap: 0 var(--lg);
  }

  .grid__item {
    background-color: var(--dark-grey-faded);
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

    @media (min-width: 768px) {
      padding: var(--md);
    }
  }

  .grid__item__img {
    position: relative;
    padding-top: 100%;
    margin: 0 auto var(--lg);

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
    font-size: 1rem;
    letter-spacing: normal;
  }

  .grid__item__label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--font-light-grey);
  }
`

export default StyledGrid;