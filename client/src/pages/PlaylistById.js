import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom"

import { getPlaylistById, getAudioFeaturesForTracks } from "../spotify"
import { catchErrors } from "../utils";
import { SectionWrapper, TrackList } from "../components";
import { StyledDropdown, StyledHeader } from "../styles";


const PlaylistById = () => {
  // get playlist id from url
  const { id } = useParams();

  // state variables
  const [playlist, setPlaylist] = useState(null);
  const [tracksData, setTracksData] = useState(null); // => endpoint Response
  const [tracks, setTracks] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);
  const [sortValue, setSortValue] = useState('');

  const initRender = useRef(true);

  const sortOptions = ['danceability', 'tempo', 'energy'];

  // initial render
  useEffect(() => {
    if (initRender.current) {
      initRender.current = false;

      const fetchData = async () => {
        // pass :id from URL to getPlaylistById endpoint
        const { data } = await getPlaylistById(id)
        // Then update state.
        setPlaylist(data);
        setTracksData(data.tracks);
      }

      catchErrors(fetchData());
    }
  }, [id])


  // On trackData updates, check for additional tracks to fetch. 
  useEffect(() => {
    if (!tracksData) { return }

    // Spotify tracks endpoint returns with default limit of 100.
    const fetchMoreData = async () => {
      if (tracksData.next && tracksData.next !== null) {
        const { data } = await axios.get(tracksData.next);

        setTracksData(data);
      }
    };

    // Merge tracks arrau, then update state.
    setTracks(tracks => (
      [
        ...tracks ? tracks : [],
        ...tracksData.items
      ]
    ));
    // fetch additional batch of tracks (limit = 100) if needed.
    catchErrors(fetchMoreData());


    // update audioFeatures state using track IDs
    const fetchAudioFeatures = async () => {
      const ids = tracksData.items.map(({ track }) => track.id).join(',');
      const { data } = await getAudioFeaturesForTracks(ids);

      // merge audioFeatures Array, then update state
      setAudioFeatures(audioFeatures => ([
        ...audioFeatures ? audioFeatures : [],
        ...data['audio_features']
      ]));
    }
    catchErrors(fetchAudioFeatures());

  }, [tracksData]);


  // Map through tracks array, add audio_features prop to each track 
  // Then return track props for TrackList component.
  const tracksWithAudioFeatures = useMemo(() => {
    if (!tracks || !audioFeatures) { return null }

    return tracks.map(({ track }) => {
      const trackToAdd = track

      if (!track.audio_features) {
        const audioFeaturesObj = audioFeatures.find(item => {

          if (!item || !track) { return null; }

          return item.id === track.id;
        })

        trackToAdd['audio_features'] = audioFeaturesObj;
      }

      return trackToAdd
    });
  }, [tracks, audioFeatures]);


  const sortTracksByAudioFeatures = useMemo(() => {
    if (!tracksWithAudioFeatures) { return null }

    return [...tracksWithAudioFeatures].sort((a, b) => {
      const aFeatures = a['audio_features'];
      const bFeatures = b['audio_features'];

      if (!aFeatures || !bFeatures) { return false }

      return bFeatures[sortValue] - aFeatures[sortValue];
    })
  }, [sortValue, tracksWithAudioFeatures])



  return (
    <>
      {playlist && (
        <>
          <StyledHeader>
            <div className="header__inner">
              {playlist.images.length && playlist.images[0].url && (
                <img className="header__img" src={playlist.images[0].url} alt="Playlist Artwork" />
              )}

              <div className='header__user__profile-group'>
                <div className="header__overline">Playlist</div>
                <h1 className="header__name">{playlist.name}</h1>
                <p className="header__meta">
                  {playlist.followers.total ? (
                    <span>
                      {playlist.followers.total}
                      {` follower${playlist.followers.total !== 1 ? 's' : ''}`}
                    </span>
                  ) : null}

                  <span>
                    {playlist.tracks.total}
                    {` song${playlist.tracks.total !== 1 ? 's' : ''}`}
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader>

          <main className="mainMask">
            <SectionWrapper title="Playlist" breadcrumb={true}>
              <StyledDropdown active={!!sortValue}>
                <label className='sr-only' htmlFor='order-select'>Custom order</label>
                <select
                  name="track-order"
                  id="order-select"
                  onChange={ev => setSortValue(ev.target.value)}
                >
                  <option value=''>Custom order</option>

                  {sortOptions.map((option, i) => (
                    <option value={option} key={i}>
                      {`${option.charAt(0).toUpperCase()}${option.slice(1)}`}
                    </option>
                  ))}
                </select>
              </StyledDropdown>

              {sortTracksByAudioFeatures && (
                <TrackList tracks={sortTracksByAudioFeatures} />
              )}
            </SectionWrapper>
          </main>

        </>
      )}
    </>
  )
}

export default PlaylistById