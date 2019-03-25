import state from './state'

function drawCar(_, offset) {
  const { width, height, position, angle } = state.car

  _.fillStyle = 'Navy'
  _.save()
  _.translate(position[0] + offset[0], position[1] + offset[1])
  _.rotate(angle)
  _.fillRect(-width / 2, -height / 2, width, height)
  _.fillStyle = 'Crimson'
  _.fillRect(-width / 2, -height / 2, width, height / 5)
  _.restore()
}

function draw(_) {
  const { world } = state
  const { width, height } = _.canvas

  _.clearRect(0, 0, width, height)

  const marginX = (width - 2 * world.width) / 3
  const marginY = (height - world.height) / 2

  /* ------------------
    Draw model world
  ------------------ */

  _.strokeStyle = 'black'
  _.beginPath()

  world.segments.forEach(([p1, p2]) => {
    _.moveTo(marginX + p1[0], marginY + p1[1])
    _.lineTo(marginX + p2[0], marginY + p2[1])
  })

  _.closePath()
  _.stroke()

  /* -------------------
    Draw visible world
  ------------------- */

  _.strokeStyle = 'red'
  _.strokeRect(2 * marginX + world.width, marginY, world.width, world.height)

  /* ---------
    Draw car
  --------- */

  drawCar(_, [marginX, marginY])
}

export default draw
