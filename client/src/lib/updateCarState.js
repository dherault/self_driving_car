import state from './state'

function updateCarState() {
  const { speed, angle, wheelsAngle, position, sensorsValues } = state.car
  const { width, height } = state.world

  let nextSpeed = sensorsValues.some(value => value < 10) ? 0 : speed
  const nextAngle = angle + wheelsAngle / 50
  const ajustedAngle = nextAngle - Math.PI / 2
  let nextPosition = [
    position[0] + speed * Math.cos(ajustedAngle) / 20,
    position[1] + speed * Math.sin(ajustedAngle) / 20,
  ]

  if (nextPosition[0] < 0 || nextPosition[0] > width || nextPosition[1] < 0 || nextPosition[1] > height) {
    nextPosition = state.car.initialPosition
  }

  state.car = {
    ...state.car,
    angle: nextAngle,
    speed: nextSpeed,
    position: nextPosition,
  }
}

export default updateCarState
