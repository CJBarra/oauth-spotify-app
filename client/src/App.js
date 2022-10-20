import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';
import './App.css';


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
      <header className="App-header">
        {!token ? (
          <a className="App-link" href="http://localhost:8000/login">
            Login to Spotify
          </a>
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

  function TopArtists() {
    return (
      <>
        <h1>Top Artists</h1>
      </>
    )
  }

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
