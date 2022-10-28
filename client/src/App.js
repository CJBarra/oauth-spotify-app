import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro';

import { accessToken, logout } from './spotify';
import { GlobalStyle } from './styles';

// pages
import {
  Login,
  Profile,
  TopArtists,
  TopTracks,
  PlaylistById,
  Playlists,
} from './pages';


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
      <div className="App-header">
        {!token ? (
          <Login />
        ) : (
          <>
            <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>

            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path='/top-artists' element={<TopArtists />} />
                <Route path='/top-tracks' element={<TopTracks />} />
                <Route path='/playlists/:id' element={<PlaylistById />} />
                <Route path='/playlists' element={<Playlists />} />
                <Route path='/' element={<Profile />} />
              </Routes>
            </BrowserRouter>
          </>
        )}
      </div>
    </div>
  );
}
export default App;


const StyledLogoutButton = styled.button`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: var(--sm);
  right: var(--md);
  padding: 6px var(--sm);
  z-index: 10;

  color: var(--font-white);
  font-size: 0.8rem;

  @media (min-width: 768px) {
    right: var(--lg);
  }
`