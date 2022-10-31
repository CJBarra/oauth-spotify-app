import { useEffect, useState } from "react"
import { ArtistsGrid, Loader, SectionWrapper } from "../components"
import { getCurrentUserFollowing } from "../spotify";
import { catchErrors } from "../utils";

const Following = () => {
  const [following, setFollowing] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserFollowing();
      setFollowing(data)
    }

    catchErrors(fetchData())
  }, [])

  return (
    <>
      <main>
        <SectionWrapper title='Following' breadcrumb={true} >
          {following ? (
            <ArtistsGrid artists={following.artists.items.slice(0, 20)} label='Profile' />
          ) : <Loader />}
        </SectionWrapper>
      </main>
    </>
  )
}

export default Following;