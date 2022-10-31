import { useEffect, useRef, useState } from "react"
import axios from "axios";

import { catchErrors } from "../utils";
import { getCurrentUserPlaylists } from "../spotify";
import { Loader, PlaylistsGrid, SectionWrapper } from "../components";

const Playlists = () => {
  // state variables
  const [playlistsData, setPlaylistsData] = useState(null); // Spotify API endpoint response
  const [playlists, setPlaylists] = useState(null); // Rendered playlist array

  /**
   *  initial render cycle ref: 
   *  due to change in React 18: useRef() used to addresses double render
   *  issue due to useEffect()  that has components mount , un-mount , and then re-mount. 
   **/
  const initRender = useRef(true);

  useEffect(() => {
    if (initRender.current) {
      initRender.current = false;

      const fetchData = async () => {
        // fetch data from getCurrentUserPlaylists endpoint
        const { data } = await getCurrentUserPlaylists();
        setPlaylistsData(data);
      }

      catchErrors(fetchData());
    }
  }, [])


  // On playlistData update, check for additional playlists to be fetched update state as needed.
  useEffect(() => {
    if (!playlistsData) { return }

    // Spotify playlist endpoint returns default limit of 20 playlists.
    const fetchMoreData = async () => {
      // if more playlists exist, check pagingObject for more.
      if (playlistsData.next && playlistsData.next !== null) {
        const { data } = await axios.get(playlistsData.next);

        setPlaylistsData(data);
      }
    };

    /**
     * functional update for playlist state variable 
     * merges previous playlists state variable array with current items array playlistsData object
     *  to avoid playlist dependancy and infinite fetch loop
     * */
    setPlaylists(playlists => (
      [
        ...playlists ? playlists : [],
        ...playlistsData.items
      ]
    ));

    // fetch additional playlists (limit = 20) as needed.
    catchErrors(fetchMoreData());
  }, [playlistsData])


  return (
    <>
      <main>
        <SectionWrapper title='Public Playlists' breadcrumb='true'>
          {playlists ? (
            <PlaylistsGrid playlists={playlists} />
          ) : <Loader />}
        </SectionWrapper>
      </main>
    </>
  )
}

export default Playlists