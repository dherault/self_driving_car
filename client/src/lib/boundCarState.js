export function boundSpeed(state, speed) {
  return Math.min(state.car.maxSpeed, Math.max(state.car.minSpeed, speed))
}

export function boundWheelsAngle(state, wheelsAngle) {
  return Math.min(state.car.maxWheelsAngle, Math.max(state.car.minWheelsAngle, wheelsAngle))
}
