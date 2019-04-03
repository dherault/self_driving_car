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

function drawDriveDuration(_, offset) {
  const { driveDurations } = state

  const min = Math.min(...driveDurations)
  const max = Math.max(...driveDurations)
  const diff = max - min

  _.save()
  _.translate(offset[0], offset[1])
  _.fillStyle = 'black'

  // console.log('___')
  driveDurations.forEach((duration, i) => {
    // console.log(duration, (max - duration) / diff * 500)

    _.beginPath()
    _.arc(i, (max - duration) / diff * 500, 1, 0, 2 * Math.PI)
    _.closePath()
    _.fill()
  })

  // if (state.driveMode === 'learn' && driveDurations.length === 20) {
  //   console.log(driveDurations)
  //   debugger
  // }


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

  /* ---------
    Draw car
  --------- */

  drawCar(_, [marginX, marginY])

  /* ----------------------
    Draw car informations
  ---------------------- */

  drawCarInformations(_, [marginX, marginY - carInformationsHeight - carInformationBottomMargin])

  /* ---------------------
    Draw drive durations
  --------------------- */

  drawDriveDuration(_, [marginX + world.width + 20, marginY])
}

export default draw
