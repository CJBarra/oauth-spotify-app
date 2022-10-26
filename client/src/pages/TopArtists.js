import { useEffect, useState } from 'react'

import { TimeRangeChips, ArtistsGrid, SectionWrapper } from '../components';
import { getTopArtists } from '../spotify';
import { catchErrors } from '../utils';

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState('short')

  useEffect(() => {
    const fetchData = async () => {
      const userTopArtists = await getTopArtists(`${activeRange}_term`);
      setTopArtists(userTopArtists.data)
    }

    catchErrors(fetchData())
  }, [activeRange])


  return (
    <>
      <main>
        <SectionWrapper title='Top artists' breadcrumb='true'>
          <TimeRangeChips activeRange={activeRange} setActiveRange={setActiveRange} />

          {topArtists && (
            <ArtistsGrid artists={topArtists.items.slice(0, 20)} label='Artist' />
          )}
        </SectionWrapper>
      </main>
    </>
  )
}

export default TopArtists



