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
  max-width: 350px;
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
    filter: brightness(1.2);
  }
`

const LOGIN_URI = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:8000/login'
  : 'http://spotify-app-with-react.herokuapp.com/login';

const Login = () => {
  return (
    <StyledLoginContainer>
      <StyledLoginButton href={LOGIN_URI}>
        Log in to spotify
      </StyledLoginButton>
    </StyledLoginContainer>
  )
}

export default Login