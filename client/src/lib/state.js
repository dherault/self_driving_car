const worldWidth = 400
const worldHeight = 400

const state = {
  worldWidth,
  worldHeight,
  worldSegments: [
    [[0, 0], [worldWidth, 0]],
    [[worldWidth, 0], [worldWidth, worldHeight]],
    [[worldWidth, worldHeight], [0, worldHeight]],
    [[0, worldHeight], [0, 0]],
    [[worldWidth / 3, worldHeight / 2], [ 2 * worldWidth / 3, worldHeight / 2]],
    [[worldWidth / 2, worldHeight / 8], [worldWidth / 2, 3 * worldHeight / 8]],
    [[worldWidth / 2, 5 * worldHeight / 8], [worldWidth / 2, 7 * worldHeight / 8]],
  ],
}

export default state
