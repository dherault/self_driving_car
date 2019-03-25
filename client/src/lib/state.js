const worldWidth = 400
const worldHeight = 400
const carWidth = 10
const carHeight = 20

const state = {
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
    wheelsAngle: 0,
  },
}

export default state
