import { useEffect, useRef, useState } from "react";
import { Loader, SectionWrapper, TimeRangeChips, TrackList } from "../components";

import { getTopTracks } from "../spotify";
import { catchErrors } from "../utils";


const TopTracks = () => {
  const [topTracks, setTopTracks] = useState(null);
  const [activeRange, setActiveRange] = useState('short');
  const [renderState, setRenderState] = useState(false);

  const initialRender = useRef(renderState ? (`${renderState}`) : false);

  useEffect(() => {
    // check if render is needed for time range change
    if (renderState === true) {
      initialRender.current = false
    }

    if (initialRender.current === false) {

      const fetchData = async () => {
        const { data } = await getTopTracks(`${activeRange}_term`);
        setTopTracks(data)
      }

      catchErrors(fetchData())
    }

    return () => initialRender.current = true
  }, [activeRange, renderState])

  return (
    <>
      <main>
        <SectionWrapper title='Top tracks' breadcrumb='true'>
          <TimeRangeChips
            activeRange={activeRange}
            setActiveRange={setActiveRange}
            setRenderState={setRenderState}
          />

          {topTracks ? (
            <TrackList tracks={topTracks.items.slice(0, 20)} />
          ) : <Loader />}
        </SectionWrapper>
      </main>
    </>
  )
}

export default TopTracks