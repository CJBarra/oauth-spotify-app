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
    font-size: 0.833rem;
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

    font-size: 1rem;
    font-variant-numeric: tabular-nums;
    overflow: visible;
  }

  .track__item__name-artist {
    align-self: flex-end;
  }
  
  .track__item__title-group {
    display: flex;
    align-items: center;
  }

  .track__item__img {
    background-color: var(--dark-grey-faded);
    margin-right: var(--sm);
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }

  .track__item__name {
    color: var(--font-white);
    font-size: 0.925rem;
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