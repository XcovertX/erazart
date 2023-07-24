import Color from "./color"
import type PositionType from "./position"

type PartType = {
    shape: string
    color: Color
    position: PositionType
    width: number
    height: number
}

export default PartType