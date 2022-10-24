import styled from 'styled-components/macro'

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const StyledLoginButton = styled.a`
  background-color: var(--accent-color);
  display: inline-block;
  max-width: 450px;
  width: 100%;
  padding: var(--sm) var(--lg);
  margin: var(--lg) auto;
  border-radius: var(--rad-pill);
  
  color: var(--font-Dark);
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;

  &:hover, &:focus {
    /* background-color: var(--accent-highlight); */
    filter: brightness(1.2);
  }
`

const Login = () => {
  return (
    <StyledLoginContainer>
      <StyledLoginButton href="http://localhost:8000/login">
        Log in
      </StyledLoginButton>
    </StyledLoginContainer>
  )
}

export default Login