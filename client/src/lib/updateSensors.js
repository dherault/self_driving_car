import state from './state'
import { distance, doesPointBelongToSegment, createVector, dotProduct, computeStraightFromPoints, computeStraightsIntersection } from './utils'

// function drawPoint(_, offset, point, color) {
//   _.fillStyle = color
//   _.beginPath()
//   _.arc(offset[0] + point[0], offset[1] + point[1], 3, 0, 2 * Math.PI)
//   _.closePath()
//   _.fill()
// }

function updateSensors(_) {
  const { car: { sensorsAngles, angle, position }, world: { segments } } = state
  // const { width, height } = _.canvas

  // const offset = [
  //   (width - 2 * state.world.width) / 3,
  //   (height - state.world.height) / 2
  // ]

  sensorsAngles.forEach((sensorAngle, i) => {
    const totalAngle = angle + sensorAngle - Math.PI / 2

    const farSensorPoint = [
      position[0] + 100 * Math.cos(totalAngle),
      position[1] + 100 * Math.sin(totalAngle),
    ]

    const sensorVector = createVector(position, farSensorPoint)

    // drawPoint(_, offset, farSensorPoint, 'green')

    const sensorStraight = computeStraightFromPoints(position, farSensorPoint)

    let minSensedDistance = Infinity

    segments.forEach(segment => {

      const segmentStraight = computeStraightFromPoints(...segment)
      const intersection = computeStraightsIntersection(sensorStraight, segmentStraight)

      if (intersection) {
        const intersectionVector = createVector(position, intersection)

        // We consider only the intersections in front of
        if (dotProduct(sensorVector, intersectionVector) >= 0) {

          if (doesPointBelongToSegment(intersection, segment)) {
            // drawPoint(_, offset, intersection, 'gold')

            const sensedDistance = distance(position, intersection)

            if (sensedDistance < minSensedDistance) {
              minSensedDistance = sensedDistance
            }
          }
          // else {
          //   drawPoint(_, offset, intersection, 'grey')
          // }
        }
        // else {
        //   drawPoint(_, offset, intersection, 'grey')
        // }
      }
    })

    state.car.sensorsValues[i] = minSensedDistance
  })
}

export default updateSensors
