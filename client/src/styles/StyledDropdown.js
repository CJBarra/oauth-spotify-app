import styled from "styled-components/macro";

const StyledDropdown = styled.div`
  position: absolute;
  top: 0;
  right: var(--sm);
  z-index: 1;

  @media (min-width: 768px) {
    right: var(--xl);
  }

  &:after {
    content: '';
    position: absolute;
    top: var(--md);
    right: var(--xs);
    width: 0;
    height: 0;

    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid var(--font-white);
  }
  
  select {
    background-color: transparent;
    padding: var(--xs) var(--lg) var(--xs) var(--sm);
    border: 0;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    
    color: var(--font-white);
    font-size: 0.8rem;
    font-weight: 600;
    font-family: inherit;
    transition: all 240ms ease;
    
    &:hover, &:focus {
      cursor: pointer;
    }

    option {
      background-color: var(--darker-grey-faded);
    }
  }
`


export default StyledDropdown;