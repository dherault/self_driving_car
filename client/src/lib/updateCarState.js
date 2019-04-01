import state from './state'

function updateCarState() {
  const { speed, angle, wheelsAngle, position } = state.car

  const nextAngle = angle + wheelsAngle / 100
  const nextPosition = [
    position[0] + speed * Math.cos(nextAngle - Math.PI / 2) / 10,
    position[1] + speed * Math.sin(nextAngle - Math.PI / 2) / 10,
  ]

  state.car = {
    ...state.car,
    angle: nextAngle,
    position: nextPosition,
  }
}

export default updateCarState
