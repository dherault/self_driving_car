import state from './state'

function updateCarState() {
  const { speed, angle, wheelsAngle, position, sensorsValues } = state.car

  let nextSpeed = sensorsValues.some(value => value < 10) ? 0 : speed
  const nextAngle = angle + wheelsAngle / 50
  const ajustedAngle = nextAngle - Math.PI / 2
  const nextPosition = [
    position[0] + speed * Math.cos(ajustedAngle) / 20,
    position[1] + speed * Math.sin(ajustedAngle) / 20,
  ]

  state.car = {
    ...state.car,
    angle: nextAngle,
    speed: nextSpeed,
    position: nextPosition,
  }
}

export default updateCarState
