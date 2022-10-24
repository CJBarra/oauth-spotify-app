import styled from "styled-components/macro";

const StyledGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(192px, 1fr));
  grid-gap: var(--md);
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: var(--lg);
  }

  .grid__item {
    background-color: var(--dark-grey-faded);
    border-radius: var(--rad-rounded);
    transition: background-color 0.3s ease;
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: var(--dark-grey);

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

  .grid__item_label {
    font-size: var(--sm);
    color: var(--font-light-grey);
  }
`

export default StyledGrid;