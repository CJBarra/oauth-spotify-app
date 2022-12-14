import axios from "axios";

// Map keys for localStorage
const LOCALSTORAGE_KEYS = {
  accessToken: 'spotify_access_token',
  refreshToken: 'spotify_refresh_token',
  expireTime: 'spotify_token_expire_time',
  timestamp: 'spotify_token_timestamp',
}


// GET localStorage key values
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
}

/**
 * Clear localStorage items, then navigate to homepage.
 * @returns {void}
 */
export const logout = () => {
  // loop through localStorage items and remove properties
  for (const keyProps in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[keyProps]);
  }

  // redirect to homepage
  window.location = window.location.origin;
}


/**
 * Checks if access token in localStorage has expired.
 * 
 * Is current token elapsed time > token expireTime
 */
const isTokenExpired = () => {
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;

  if (!accessToken || !timestamp) {
    return false;
  }

  // Spotify token default expire time = 3600s. (1 hour)
  const millisecondElapsed = Date.now() - Number(timestamp);
  return (millisecondElapsed / 1000) > Number(expireTime);
}


/**
 * async function
 * 
 * Targets '/refresh_token' endpoint using refresh token in localStorage,
 * then updates local storage values with response.
 * @returns {void} 
 */
const refreshToken = async () => {
  try {
    // if no refresh token available logout user.
    if (!LOCALSTORAGE_VALUES.refreshToken ||
      LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
      (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000)
    ) {
      console.error('No refresh token available');
      logout();
    }

    // axios GET token from '/refresh_token' Node app endpoint
    const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);

    // update localStorage values [accessToken, timestamp]
    window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

    window.location.reload();
  } catch (e) {
    console.error(e);
  }
}

/**
 * Retrieve a Spotify access token from localStorage or from
 * URL query params.
 * 
 * proxy set for 'cors' resolution in package.json
 * 
 * @returns {string} Spotify access token
 */
const getAccessToken = () => {
  const qs = window.location.search;
  const urlParams = new URLSearchParams(qs);

  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
  }
  const hasError = urlParams.get('error');

  // handle error or expired token
  if (hasError || isTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
    refreshToken()
  }

  // handle if valid token in localStorage should be used
  if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
    return LOCALSTORAGE_VALUES.accessToken;
  }

  // check URL queryParams for a token, assume user is logging in for first time
  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    // store queryParams in localStorage
    for (const keysProp in queryParams) {
      window.localStorage.setItem(keysProp, queryParams[keysProp]);
    }

    // sets timestamp for token
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now())

    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }

  // on failure
  return false;
}
export const accessToken = getAccessToken();


/**
 * Get current User Profile
 * 
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-current-users-profile
 * @returns {Promise}
 */
export const getCurrentUserProfile = () => axios.get('/me');


/**
 * Get a list of the playlists owned or followed by the current Spotify user.
 * 
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists
 * @returns {Promise}
 */
export const getCurrentUserPlaylists = (limit = 20) => {
  return axios.get(`/me/playlists?limit=${limit}`);
};


/**
 * Get the current user's top artists or tracks based on calculated affinity.
 * 
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks
 * @param {string} time_range - Valid values:
 *  
 * long_term (calculated from several years of data and including all new data as it becomes available),
 *  
 * medium_term (approximately last 6 months), 
 * 
 * short_term (approximately last 4 weeks). Default: medium_term
 * @returns {Promise}
 */
export const getTopArtists = (time_range = 'short_term') => {
  return axios.get(`/me/top/artists?time_range=${time_range}`);
}
export const getTopTracks = (time_range = 'short_term') => {
  return axios.get(`/me/top/tracks?time_range=${time_range}`);
}


/**
 * Get a Playlist
 * 
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/check-if-user-follows-playlist
 * @param {string} playlist_id - Spotify ID of the playlist 
 * @returns {Promise}
 */
export const getPlaylistById = playlist_id => {
  return axios.get(`/playlists/${playlist_id}`);
}


/**
 * Get current user's followed artists
 * 
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-followed
 * @returns {Promise}
 */
export const getCurrentUserFollowing = (limit = 20, type = 'artist') => {
  return axios.get(`/me/following?type=${type}&limit=${limit}`);
}

/**
 * Get audio feature information for a single track identified by its unique Spotify ID.
 * 
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features
 * @param {string} ids - A comma-separated list of Spotify IDs for tracks
 * @returns {Promise} Promise
 */
export const getAudioFeaturesForTracks = ids => {
  return axios.get(`/audio-features?ids=${ids}`);
}

/**
 * Set axios global default request headers
 * https://axios-http.com/docs/config_defaults
 * 
 */
axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`; // OAuth token from localStorage
axios.defaults.headers.post['Content-Type'] = 'application/json';
