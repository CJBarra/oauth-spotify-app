import { StyledRangeChips } from "../styles"

const TimeRangeChips = ({ activeRange, setActiveRange, setRenderState }) => {
  return (

    <StyledRangeChips>
      <li>
        <button
          className={activeRange === 'short' ? 'active' : ''}
          onClick={() => {
            setActiveRange('short')
            setRenderState(true);
          }}>This Month
        </button>
      </li>
      <li>
        <button
          className={activeRange === 'medium' ? 'active' : ''}
          onClick={() => {
            setActiveRange('medium')
            setRenderState(true)
          }
          }>Last 6 Months
        </button>
      </li>
      <li>
        <button
          className={activeRange === 'long' ? 'active' : ''}
          onClick={() => {
            setActiveRange('long')
            setRenderState(true)
          }}>All Time
        </button>
      </li>
    </StyledRangeChips>
  )
}

export default TimeRangeChips