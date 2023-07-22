import type PartType from './part'
import type PositionType from './position'

type CartType = {
    id: number
    position: PositionType
    age: number
    height: number
    width: number
    isTransitioning: boolean
    transitionCount: number
    parts: PartType[]
    speed: number
    direction: string
}

export default CartType
