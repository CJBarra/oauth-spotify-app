import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro';

import { accessToken, logout } from './spotify';
import { GlobalStyle } from './styles';

// pages
import { Login, PlaylistById, Playlists, Profile, TopArtists, TopTracks } from './pages';


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    // get OAuth access token from URL, then, set setToken state
    setToken(accessToken)
  }, [])

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
          <>
            <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>

            <BrowserRouter >
              <ScrollToTop />
              <Routes>
                <Route path='/top-artists' element={<TopArtists />} />
                <Route path='/top-tracks' element={<TopTracks />} />
                <Route path='/playlist/:id' element={<PlaylistById />} />
                <Route path='/playlists' element={<Playlists />} />
                <Route path='/' element={<Profile />} />
              </Routes>
            </BrowserRouter>
          </>
        )}
      </header>
    </div>
  );
}
export default App;


const StyledLogoutButton = styled.button`
  background-color: var(--dark-grey);
  position: absolute;
  top: var(--sm);
  right: var(--md);
  padding: var(--xs) var(--sm);
  z-index: 10;

  font-size: 14px;

  @media (min-width: 768px) {
    right: var(--lg);
  }
`