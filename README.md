# Spotify Connected App with React

Creating a Spotify API connected app that will display a user's Profile data.

## Setup & Installation

1. Register your app in your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
  - edit app settings and add: 'http://localhost:8000/callback' to your Redirect URIs. 
  - Save your changes.

2. Create an '.env' file at the root of the project referencing '.env.example'.
  - add your unique `CLIENT_ID' and `CLIENT_SECRET` from Spotify Dashboard.

3. Ensure [npm](https://www.npmjs.com/) is installed globally.

4. Install dependencies

```shell 
npm install
```

5. Run the React app on <http://localhost:3000> and the node server on <http://localhost:8000>



## Deploying app on Heroku with Git

1. Create a [Heroku](https://www.heroku.com/) app

2. Add a git remote to your Heroku map

```shell
heroku git:remote -a [your-app-name]
```

3. In your app's **Settings** tab in the Heroku dashboard, add [config vars](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard).
  - Using the values in your `.env` file: `CLIENT_ID, `CLIENT_SECRET`, `REDIRECT_URI`, and `FRONTEND_URI` key value pair. 
  - Replace the localhost URLs with your heroku app's URL.

```env
REDIRECT_URI: http://your-app-name.herokuapp.com/callback
FRONTEND_URI: http://your-app-name.herokuapp.com
```

4. Push to Heroku
```shell
git push heroku main
```