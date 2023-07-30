import Color from "../../interfaces/color"

type Settings =
{
    border:                number,
    brownianScalar:        number,
    attractionScalar:      number,
    repulsionScalar:       number,
    repulsionRadius:       number,
    alignmentScalar:       number,
    minDistance:           number,
    maxDistance:           number,
    maxVelocity:           number,
    movingNodeRadius:      number,
    fixedNodeRadius:       number,
    nodeInjectionRate:     number,
    drawNodesMode:         boolean,
    traceMode:             boolean,
    debugMode:             boolean,
    fillMode:              boolean,
    brownianMode:          boolean,
    isClosed:              boolean,
    showBoundsMode:        boolean,
    paused:                boolean,
    restart:               boolean,
    strokeColor:           Color,
    backgroundColor:       Color,
    fillColor:             Color,
    fixedColor:            Color,
    movingColor:           Color
  }
  export default Settings