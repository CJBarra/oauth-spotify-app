import styled, { keyframes } from 'styled-components/macro'

const dance = keyframes`
  from {
    height: 10px;
  } to {
    height: 100%;
  }
`

const StyledLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 50vh;

  .bars {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100px;
    min-width: 100px;
    height: 36px;
    
    margin: 0;
    left: 0;
    right: 0;
    z-index: 2;
    /* overflow: hidden; */
  }
`

const StyledBar = styled.div`
  background-color: var(--accent-highlight);
  width: 10px;
  height: 5px;
  margin: 0 2px;

  /* animation */
  animation-name: ${dance};
  animation-duration: 400ms;
  animation-play-state: running;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: ${props => props.delay || '0ms'};
`

const Loader = () => (
  <StyledLoader>
    <div className='bars'>
      <StyledBar delay='715ms' />
      <StyledBar delay='25ms' />
      <StyledBar delay='190ms' />
      <StyledBar delay='315ms' />
      <StyledBar delay='125ms' />
      <StyledBar delay='82ms' />
    </div>
  </StyledLoader>
)

export default Loader;