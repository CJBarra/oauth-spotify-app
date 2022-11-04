import { useEffect, useRef, useState } from 'react'

import { TimeRangeChips, ArtistsGrid, SectionWrapper, Loader } from '../components';
import { getTopArtists } from '../spotify';
import { catchErrors } from '../utils';

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState('short')
  const [renderState, setRenderState] = useState(false);

  const initialRender = useRef(renderState ? (`${renderState}`) : false);

  useEffect(() => {
    // check if render is needed for time range change
    if (renderState === true) {
      initialRender.current = false
    }

    if (initialRender.current === false) {
      const fetchData = async () => {
        const { data } = await getTopArtists(`${activeRange}_term`);
        setTopArtists(data)
      }
      catchErrors(fetchData())
    }

    return () => initialRender.current = true
  }, [activeRange, renderState])


  return (
    <>
      <main>
        <SectionWrapper title='Top artists' breadcrumb='true'>
          <TimeRangeChips
            activeRange={activeRange}
            setActiveRange={setActiveRange}
            setRenderState={setRenderState}
          />

          {topArtists ? (
            <ArtistsGrid artists={topArtists.items.slice(0, 20)} label='Artist' />
          ) : <Loader />}
        </SectionWrapper>
      </main>
    </>
  )
}

export default TopArtists



