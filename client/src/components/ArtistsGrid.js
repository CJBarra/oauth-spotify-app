import { StyledGrid } from '../styles';

const ArtistsGrid = ({ artists, label }) => (
  <>
    {artists && artists.length ? (
      <StyledGrid type="artist">
        {artists.map((artist, i) => (
          <li className="grid__item" key={i}>
            <div className="grid__item__inner">
              {artist.images[0] && (
                <div className="grid__item__img">
                  <img src={artist.images[0].url} alt={artist.name} />
                </div>
              )}
              <h3 className="grid__item__name overflow-ellipsis">{artist.name}</h3>
              <p className="grid__item__label">{label}</p>
            </div>
          </li>
        ))}
      </StyledGrid>
    ) : (
      <p className="empty">No artists to show here</p>
    )}
  </>
)

export default ArtistsGrid;