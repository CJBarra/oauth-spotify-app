import styled from "styled-components/macro";

const StyledRangeChips = styled.ul`
  display: flex;
  justify-content: flex-end;
  margin: 0 0 var(--md) 0;
  padding: 0;
  list-style: none;

  li {
    &:not(:last-of-type){
      margin-right: var(--xs);
    }
  }

  button {
    background-color: var(--darker-grey-faded);

    &:hover, 
    &:focus {
      background-color: var(--mid-grey);
    }
    &.active {
      background-color: var(--accent-color);
    }
  }
`

export default StyledRangeChips;