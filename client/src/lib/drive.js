import state from './state'
import updateSensors from './updateSensors'
import updateCarState from './updateCarState'
import { boundSpeed, boundWheelsAngle } from './boundCarState'
import { randomRange, randomPop, roundThreshold } from './utils'

function hashState() {
  const { speed, wheelsAngle, sensorsValues } = state.car

  return JSON.stringify({
    speed: roundThreshold(speed, (state.car.maxSpeed - state.car.minSpeed) / 10),
    wheelsAngle: roundThreshold(wheelsAngle, (state.car.maxWheelsAngle - state.car.minWheelsAngle) / 10),
    sensorsValues: sensorsValues.map(value => roundThreshold(value, 30)),
  })
}

function hashAction(action) {
  return JSON.stringify(action)
}

function unhashAction(actionHash) {
  return JSON.parse(actionHash)
}

function getRandomAction() {
  return {
    speed: roundThreshold(randomRange(state.car.minSpeed, state.car.maxSpeed), 10),
    wheelsAngle: randomPop([
      state.car.minWheelsAngle,
      state.car.maxWheelsAngle,
      (state.car.maxWheelsAngle + state.car.minWheelsAngle) / 2,
    ]),
  }
}

function applyAction(action) {
  state.car.speed = boundSpeed(state, action.speed)
  state.car.wheelsAngle = boundWheelsAngle(state, action.wheelsAngle)
}

const learningRate = 0.1
const rewardDecay = 0.97
const nCarUpdates = 3

// stateHash -> action
// const policy = {}
// stateHash -> actionHash -> q-value
const qValues = {}

let i = 0

function computeReward() {
  const sensorsValuesSum = state.car.sensorsValues.reduce((a, b) => a + b, 0)

  state.reward = sensorsValuesSum * state.car.speed
}

function findMaxActionHash(actionHashesToQValue) {
  let maxActionHash
  let maxQValue = 0

  Object.entries(actionHashesToQValue).forEach(([actionHash, qValue]) => {
    if (qValue > maxQValue) {
      maxQValue = qValue
      maxActionHash = actionHash
    }
  })

  return maxActionHash
}

export function driveLearn() {
  const intervalId = setInterval(() => {
    i++
    const stateHash = hashState()

    if (!qValues[stateHash]) {
      qValues[stateHash] = {}
    }

    let action
    let actionHash = findMaxActionHash(qValues[stateHash])

    if (!actionHash || Math.random() > 0.8) {
      action = getRandomAction()
      actionHash = hashAction(action)
    }
    else {
      console.log('using learned action')
      action = unhashAction(actionHash)
    }

    applyAction(action)

    for (let k = 0; k < nCarUpdates; k++) {
      updateCarState()
      updateSensors()
    }

    computeReward()

    if (state.car.sensorsValues.some(value => value < 30)) {
      state.car.position = [
        randomRange(0, state.world.width),
        randomRange(0, state.world.height),
      ]
      state.car.angle = Math.random() * 2 * Math.PI
      state.reward -= 100
      state.driveDurations.push(i - (state.driveDurations[state.driveDurations.length - 1] || 0))

      if (state.driveDurations.length > 500) {
        state.driveDurations.shift()
      }

      updateSensors()
    }

    const nextStateHash = hashState()

    if (!qValues[nextStateHash]) {
      qValues[nextStateHash] = {}
    }

    const maxActionHash = findMaxActionHash(qValues[nextStateHash])

    // Q-learing, running interpolation update
    qValues[stateHash][actionHash] = (1 - learningRate) * (qValues[stateHash][actionHash] || 0) + learningRate * (state.reward + rewardDecay * (qValues[nextStateHash][maxActionHash] || 0))

    if (i % 100 === 0) {
      const valuesLengths = Object.values(qValues).map(actionHasheToQValue => Object.keys(actionHasheToQValue).length)
      const valuesLengthsSum = valuesLengths.reduce((a, b) => a + b, 0)

      console.log(Object.keys(qValues).length, valuesLengthsSum / valuesLengths.length)
    }
  }, 17)

  return () => stopDriving(intervalId)
}

export function driveAuto() {
  const intervalId = setInterval(() => {
    i++
    const stateHash = hashState()

    const maxActionHash = findMaxActionHash(qValues[stateHash] || {})

    const action = maxActionHash ? unhashAction(maxActionHash) : getRandomAction()

    applyAction(action)
    updateCarState()
    updateSensors()

    if (state.car.sensorsValues.some(value => value < 30)) {
      state.car.position = state.car.initialPosition
      state.reward -= 100
      updateSensors()
    }

  }, 17)

  return () => stopDriving(intervalId)
}

function stopDriving(intervalId) {
  clearInterval(intervalId)
  state.car.speed = 0
  state.car.wheelsAngle = 0
}
