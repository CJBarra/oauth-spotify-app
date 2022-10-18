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

// is current token elapsed time >= token expireTime
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
 * Clear localStorage items, then navigate to homepage.
 * @returns {void}
 */
export const logout = () => {
  // loop through localStorage items and remove properties
  for (const keysProp in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[keysProp]);
  }

  // redirect to homepage
  window.location = window.location.origin;
}


/**
 * async function
 * 
 * targets '/refresh_token' endpoint using refresh token in localStorage,
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
  const qs = window.location.search
  const urlParams = new URLSearchParams(qs)

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


// exports
export const accessToken = getAccessToken();