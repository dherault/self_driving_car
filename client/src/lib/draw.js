import state from './state'

function drawCar(_, offset) {
  const { width, height, position, angle, sensorsAngles, sensorsValues } = state.car

  _.fillStyle = 'blue'
  _.save()
  _.translate(position[0] + offset[0], position[1] + offset[1])
  _.rotate(angle)
  _.fillRect(-width / 2, -height / 2, width, height)
  _.fillStyle = 'red'
  _.fillRect(-width / 2, -height / 2, width, height / 5)

  // Draw sensors
  _.strokeStyle = 'green'
  _.beginPath()
  sensorsAngles.forEach((sensorAngle, i) => {
    const value = sensorsValues[i] || 0

    _.moveTo(0, 0)
    _.lineTo(value * Math.sin(sensorAngle), -value * Math.cos(sensorAngle))
  })
  _.closePath()
  _.stroke()
  _.restore()
}

const carInformationsWidth = state.world.width
const carInformationsHeight = 100
const carInfomationWheelsAngleWidth = 0.5 * carInformationsWidth
const carInformationSpeedWidth = 20
const carInformationBottomMargin = 20

function drawCarInformations(_, offset) {
  const { speed, minSpeed, maxSpeed, wheelsAngle, minWheelsAngle, maxWheelsAngle } = state.car

  _.strokeStyle = 'black'
  _.lineWidth = 1

  _.save()
  _.translate(offset[0] , offset[1])

  _.save()
  _.translate(carInformationsHeight / 2 * Math.sin(maxWheelsAngle), 0)

  _.beginPath()
  _.moveTo(0, carInformationsHeight / 2)
  _.lineTo(carInfomationWheelsAngleWidth, carInformationsHeight / 2)
  _.closePath()
  _.stroke()

  _.save()
  _.translate(0, carInformationsHeight / 2)

  _.save()
  _.rotate(minWheelsAngle)
  _.beginPath()
  _.moveTo(0, -carInformationsHeight / 2)
  _.lineTo(0, carInformationsHeight / 2)
  _.closePath()
  _.stroke()
  _.restore()

  _.save()
  _.rotate(maxWheelsAngle)
  _.beginPath()
  _.moveTo(0, -carInformationsHeight / 2)
  _.lineTo(0, carInformationsHeight / 2)
  _.closePath()
  _.stroke()
  _.restore()

  _.save()
  _.strokeStyle = 'red'
  _.lineWidth = 2
  _.rotate(wheelsAngle)
  _.beginPath()
  _.moveTo(0, -carInformationsHeight / 2)
  _.lineTo(0, carInformationsHeight / 2)
  _.closePath()
  _.stroke()
  _.restore()

  _.restore()

  _.strokeStyle = 'black'
  _.lineWidth = 1

  _.save()
  _.translate(carInfomationWheelsAngleWidth, carInformationsHeight / 2)

  _.save()
  _.rotate(minWheelsAngle)
  _.beginPath()
  _.moveTo(0, -carInformationsHeight / 2)
  _.lineTo(0, carInformationsHeight / 2)
  _.closePath()
  _.stroke()
  _.restore()

  _.save()
  _.rotate(maxWheelsAngle)
  _.beginPath()
  _.moveTo(0, -carInformationsHeight / 2)
  _.lineTo(0, carInformationsHeight / 2)
  _.closePath()
  _.stroke()
  _.restore()

  _.save()
  _.strokeStyle = 'red'
  _.lineWidth = 2
  _.rotate(wheelsAngle)
  _.beginPath()
  _.moveTo(0, -carInformationsHeight / 2)
  _.lineTo(0, carInformationsHeight / 2)
  _.closePath()
  _.stroke()
  _.restore()

  _.restore()

  _.restore()

  _.save()
  _.translate(carInformationsWidth - carInformationSpeedWidth, 0)

  _.fillStyle = 'LightGrey'
  _.fillRect(0, 0, carInformationSpeedWidth, carInformationsHeight)
  _.fillStyle = 'red'

  const speedRatio = (speed - minSpeed) / (maxSpeed - minSpeed)

  _.fillRect(0, carInformationsHeight * (1 - speedRatio), carInformationSpeedWidth, carInformationsHeight * speedRatio)

  _.restore()

  _.restore()
}

function draw(_) {
  const { world } = state
  const { width, height } = _.canvas

  _.clearRect(0, 0, width, height)

  const marginX = (width - 2 * world.width) / 3
  const marginY = (height - world.height) / 2
  // const marginX = 0
  // const marginY = 0

  /* ------------------
    Draw model world
  ------------------ */

  _.strokeStyle = 'black'
  _.lineWidth = 1
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

  /* ----------------------
    Draw car informations
  ---------------------- */

  drawCarInformations(_, [marginX, marginY - carInformationsHeight - carInformationBottomMargin])
}

export default draw
