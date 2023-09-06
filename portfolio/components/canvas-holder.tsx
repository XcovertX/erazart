import DifferentialGrowthContainer from '../differential-growth-core/demo-1/dif-gro-example-1'
import Header from './header'

const CanvasHolder = () => {
  return (
    <div>
      <Header />
      <div className="flex py-5 justify-center">
        <DifferentialGrowthContainer />
      </div>
    </div>
  )
}

export default CanvasHolder