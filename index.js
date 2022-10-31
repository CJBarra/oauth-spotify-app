const express = require("express")
const axios = require('axios')
const querystring = require('node:querystring')
const app = express()
const path = require('path')
require('dotenv').config()

// env variables
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const FRONTEND_URI = process.env.REDIRECT_URI
const PORT = process.env.PORT || 8000

// Priority Serve static files
app.use(express.static(path.resolve(__dirname, './client/build')));

// utils
const generateRandomString = length => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}


// routes
app.get('/', (req, res) => {
  const data = {
    name: 'Hello',
    isWorking: true,
  }

  res.json(data)
})

app.get('/login', (req, res) => {
  const stateKey = 'spotify_auth_state';
  const state = generateRandomString(16);
  res.cookie(stateKey, state)

  /**
   * required scopes for third-party apps
   * https://developer.spotify.com/documentation/general/guides/authorization/scopes/#playlist-read-private
   * @param {string}
   */
  const scope = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'user-top-read',
    'user-follow-read',
  ].join(' ');

  // redirect to Spotify Accounts Service for login
  res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope
  }))
})

app.get('/callback', (req, res) => {
  const code = req.query.code || null;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      code: code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
    },
  })
    .then(response => {
      if (response.status === 200) {
        // On successful Login, redirect to react app
        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
          expires_in,
        })

        // pass access and refresh tokens from Spotify Account Service in query params
        res.redirect(`${FRONTEND_URI}/?${queryParams}`)

      } else {
        res.redirect(`/?${querystring.stringify({ error: 'invalid token' })}`)
      }
    })
    .catch(error => {
      res.send(error)
    })
})

app.get('/refresh_token', (req, res) => {
  const { refresh_token } = req.query

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      refresh_token: refresh_token,
      grant_type: 'refresh_token'
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
    },
  })
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      res.send(error)
    })
})

// handle requests express cannot with React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
})


app.listen(PORT, () => {
  console.log(`Express listening at... http://localhost:${PORT}`)
})