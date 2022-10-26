import styled from "styled-components/macro";

const StyledTrackList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  .track__item {
    display: grid;
    align-items: center;
    grid-template-columns: 20px 4fr 2fr minmax(60px, 1fr);
    grid-gap: var(--md);
    padding: var(--xs) 0;
    border-radius: var(--rad-rounded);

    color: var(--font-light-grey);
    font-size: 0.7rem;
    font-weight: 600;
    transition: background-color 250ms ease;

    @media (min-width: 768px) {
      padding: var(--xs) var(--sm);
    }

    &:hover, &:focus {
      background-color: var(--mid-grey);
      color: var(--font-white);
      cursor: default;
    }
  }

  .track__item__number {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    font-size: 0.8rem;
    font-variant-numeric: tabular-nums;
    overflow: visible;
  }

  .track__item__name-artist {
    align-self: stretch;
  }
  
  .track__item__title-group {
    display: flex;
    align-items: center;
  }

  .track__item__img {
    background-color: var(--darker-grey-faded);
    margin-right: var(--sm);
    width: 35px;
    height: 35px;
    flex-shrink: 0;
  }

  .track__item__name {
    color: var(--font-white);
    font-size: 0.8rem;
  }

  .track__item__artist {
    transition: all 250ms ease;

    span {
      &:hover, &:focus {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  .track__item__album {
    display: block;
    white-space: nowrap;
  }

  .track__item__duration {
    display: flex;
    justify-content: flex-end;
    font-variant-numeric: tabular-nums;
  }
`
export default StyledTrackList;