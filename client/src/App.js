import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';
import { GlobalStyle } from './styles';
import styled from 'styled-components/macro';

import TopArtists from './components/TopArtists';
import TopTracks from './components/TopTracks';
import PlaylistById from './components/PlaylistById';
import Playlists from './components/Playlists';


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
              <Route path='/playlist/:id' element={<PlaylistById />} />
              <Route path='/playlists' element={<Playlists />} />
              <Route path='/' element={<UserProfile />} />
            </Routes>
          </BrowserRouter>
        )}
      </header>
    </div>
  );


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
  background-color: var(--accent-color);
  display: inline-block;
  padding: 10px 20px;
  margin: 20px auto;
  border-radius: 20px;
  
  color: var(--font-Dark);
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;

  &:hover {
    background-color: var(--accent-highlight);
  }
`