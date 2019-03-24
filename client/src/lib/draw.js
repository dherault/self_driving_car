import state from './state'

function drawCar(_, angle) {

}

function draw(_) {

  const { width, height } = _.canvas

  _.clearRect(0, 0, width, height)

  const marginX = (width - 2 * state.worldWidth) / 3
  const marginY = (height - state.worldHeight) / 2

  /* ------------------
    Draw model world
  ------------------ */

  _.strokeStyle = 'black'
  _.beginPath()

  state.worldSegments.forEach(([p1, p2]) => {
    _.moveTo(marginX + p1[0], marginY + p1[1])
    _.lineTo(marginX + p2[0], marginY + p2[1])
  })

  _.closePath()
  _.stroke()

  /* -------------------
    Draw visible world
  ------------------- */

  _.strokeStyle = 'red'
  _.strokeRect(2 * marginX + state.worldWidth, marginY, state.worldWidth, state.worldHeight)
}

export default draw
