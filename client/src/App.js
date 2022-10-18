import { useEffect, useState } from 'react'

import { accessToken, logout } from './spotify';
import './App.css';

function App() {
  const [token, setToken] = useState(null)

  // GET, SET OAuth access token from URL
  useEffect(() => {
    setToken(accessToken)
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <a
            className="App-link"
            href="http://localhost:8000/login"
          >
            Login to Spotify
          </a>
        ) : (
          <>
            <h1>Logged in!</h1>
            <button onClick={logout}>Log Out</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
