import DifferentialGrowthContainer from '../differential-growth-core/art'
import DifferentialLetters from '../differential-growth-core/differential-letters'

const CanvasHolder = () => {
  return (
    <div className="flex py-5 justify-center">
        {/* <DifferentialGrowthContainer /> */}
        <DifferentialLetters />
    </div>
  )
}

export default CanvasHolder