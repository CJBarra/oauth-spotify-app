import { useEffect, useState } from 'react'

import {
  getCurrentUserFollowing,
  getCurrentUserPlaylists,
  getCurrentUserProfile,
  getTopArtists,
  getTopTracks
} from '../spotify'
import {
  ArtistsGrid,
  SectionWrapper,
  TrackList,
  PlaylistsGrid
} from '../components'
import { catchErrors } from '../utils'
import { StyledHeader } from '../styles'

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [following, setFollowing] = useState(null);

  useEffect(() => {
    // await response from getCurrentUserProfile, then, set setProfile state variable
    const fetchData = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);

      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylists(userPlaylists.data);

      const userTopArtists = await getTopArtists();
      setTopArtists(userTopArtists.data);

      const userTopTracks = await getTopTracks();
      setTopTracks(userTopTracks.data);

      const userFollowing = await getCurrentUserFollowing();
      setFollowing(userFollowing.data)
    }

    catchErrors(fetchData())
  }, [])



  return (
    <>
      {profile && (
        <>
          <StyledHeader type="user">
            <div className='header__inner'>
              {profile.images.length && profile.images[0].url && (
                <img className='header__img' src={profile.images[0].url} alt='Avatar' />
              )}

              <div>
                <div className='header__overline'>Profile</div>
                <h1 className='header__name'>{profile.display_name}</h1>
                <p className='header__meta'>
                  {playlists && (
                    <span>{playlists.total} Playlist{playlists.total !== 1 ? 's' : ''}</span>
                  )}
                  <span>
                    {profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader>
        </>
      )}

      {topArtists && topTracks && playlists && following && (
        <main>
          <SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
            <ArtistsGrid artists={topArtists.items.slice(0, 10)} label='Artist' />
          </SectionWrapper>

          <SectionWrapper title="Top tracks this month" seeAllLink='/top-tracks'>
            <TrackList tracks={topTracks.items.slice(0, 5)} />
          </SectionWrapper>

          <SectionWrapper title="Playlists" seeAllLink='/playlists'>
            <PlaylistsGrid playlists={playlists.items.slice(0, 10)} />
          </SectionWrapper>

          <SectionWrapper title="Following" seeAllLink='/following'>
            <ArtistsGrid artists={following.artists.items.slice(0, 10)} label='Profile' />
          </SectionWrapper>
        </main>
      )}
    </>
  )
};

export default Profile