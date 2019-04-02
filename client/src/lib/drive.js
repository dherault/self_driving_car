import state from './state'
import updateSensors from './updateSensors'
import updateCarState from './updateCarState'
import { boundSpeed, boundWheelsAngle } from './boundCarState'
import { randomRange, randomRangeFloat, roundThreshold } from './utils'

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
    speed: state.car.sensorsValues.some(value => value < 10) ? state.car.minSpeed : randomRange(state.car.minSpeed, state.car.maxSpeed),
    wheelsAngle: roundThreshold(randomRangeFloat(state.car.minWheelsAngle, state.car.maxWheelsAngle), (state.car.maxWheelsAngle - state.car.minWheelsAngle) / 10)
  }
}

function applyAction(action) {
  state.car.speed = boundSpeed(state, action.speed)
  state.car.wheelsAngle = boundWheelsAngle(state, action.wheelsAngle)
}

const learningRate = 0.05
const rewardDecay = 0.97

// stateHash -> action
// const policy = {}
// stateHash -> actionHash -> q-value
const qValues = {}

let i = 0

function computeReward(state) {
  const someSensorIsLow = state.car.sensorsValues.some(value => value < 30)

  return someSensorIsLow ? -10 : state.car.speed
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

    if (!actionHash || Math.random() > 0.75) {
      action = getRandomAction()
      actionHash = hashAction(action)
    }
    else {
      console.log('using learned action')
      action = unhashAction(actionHash)
    }

    applyAction(action)
    updateCarState()
    updateSensors()

    state.reward = computeReward(state)

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
  }, 17)

  return () => stopDriving(intervalId)
}

function stopDriving(intervalId) {
  clearInterval(intervalId)
  state.car.speed = 0
  state.car.wheelsAngle = 0
}
