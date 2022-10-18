import { useEffect } from 'react'

import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    // pull and store OAuth access & refresh tokens from URL
    const qs = window.location.search
    const urlParams = new URLSearchParams(qs)
    const accessToken = urlParams.get('access_token')
    const refreshToken = urlParams.get('refresh_token')

    // OAuth token expired => retrieve new from '/refresh_token' endpoint in express app
    if (refreshToken) {
      fetch(`/refresh_token?refresh_token=${refreshToken}`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
        // proxy set for 'cors' resolution in package.json
    }
  }, [])



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="http://localhost:8000/login"
        >
          Login to Spotify
        </a>
      </header>
    </div>
  );
}

export default App;
