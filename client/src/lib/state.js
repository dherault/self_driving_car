const worldWidth = 400
const worldHeight = 400
const carWidth = 10
const carHeight = 20

export const listeners = []

const state = new Proxy({
  world: {
    width: worldWidth,
    height: worldHeight,
    segments: [
      [[0, 0], [worldWidth, 0]],
      [[worldWidth, 0], [worldWidth, worldHeight]],
      [[worldWidth, worldHeight], [0, worldHeight]],
      [[0, worldHeight], [0, 0]],
      [[worldWidth / 3, worldHeight / 2], [ 2 * worldWidth / 3, worldHeight / 2]],
      [[worldWidth / 2, worldHeight / 8], [worldWidth / 2, 3 * worldHeight / 8]],
      [[worldWidth / 2, 5 * worldHeight / 8], [worldWidth / 2, 7 * worldHeight / 8]],
    ],
  },
  car: {
    width: carWidth,
    height: carHeight,
    angle: 0,
    position: [worldWidth / 3, worldHeight / 3],
    speed: 0,
    minSpeed: 0,
    maxSpeed: 100,
    incrementSpeed: 2,
    wheelsAngle: 0,
    minWheelsAngle: -Math.PI / 3,
    maxWheelsAngle: Math.PI / 3,
    incrementWheelsAngle: Math.PI / 30,
  },
  driveMode: 'manual',
}, {
  set(object, property, value) {
    listeners.forEach(fn => {
      if (typeof fn === 'function') {
        fn()
      }
    })

    object[property] = value

    return true
  },
})

export default state
