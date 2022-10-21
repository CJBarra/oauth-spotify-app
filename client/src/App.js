import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';

import styled, { createGlobalStyle } from 'styled-components/macro';
import TopArtists from './components/TopArtists';


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    // get OAuth access token from URL, then, set setToken state
    setToken(accessToken)

    // await response from getCurrentUserProfile, then, set setProfile state variable
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile()
      setProfile(data)
    }

    catchErrors(fetchData())
  }, [])

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <StyledLoginButton href="http://localhost:8000/login">
            Log in
          </StyledLoginButton>
        ) : (
          <BrowserRouter >
            <ScrollToTop />
            <Routes>
              <Route path='/top-artists' element={<TopArtists />} />
              <Route path='/top-tracks' element={<TopTracks />} />
              <Route path='/playlists/:id' element={<PlaylistsById />} />
              <Route path='/playlists' element={<Playlists />} />
              <Route path='/' element={<UserProfile />} />
            </Routes>
          </BrowserRouter>
        )}
      </header>
    </div>
  );

  function TopTracks() {
    return (
      <>
        <h1>Top Tracks</h1>
      </>
    )
  }

  function PlaylistsById() {
    return (
      <>
        <h1>Playlist</h1>
      </>
    )
  }

  function Playlists() {
    return (
      <>
        <h1>Playlists</h1>
      </>
    )
  }

  function UserProfile() {
    return (
      <>
        <button onClick={logout}>Log Out</button>

        {profile && (
          <div>
            <h1>{profile.display_name}</h1>
            <p>{profile.followers.total} Followers</p>

            {profile.images.length && profile.images[0].url && (
              <img src={profile.images[0].url} alt='Avatar' />
            )}
          </div>
        )}
      </>
    )
  }

} // app() end
export default App;


const StyledLoginButton = styled.a`
  background-color: #1ed760;
  display: inline-block;
  padding: 10px 20px;
  margin: 20px auto;
  border-radius: 20px;
  
  color: #000;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;

  &:hover {
    background-color: #1ee665;
  }
`

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,  *::before, *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #1e1e1e;
    color: #eee;
  }
`