import React, { Component } from 'react'
import hotkeys from 'piano-keys'

import './index.css'

import connect from '../lib/connect'
import state from '../lib/state'

class App extends Component {

  componentDidMount() {
    this.registerHotkeys()
  }

  registerHotkeys() {
    this.unregisterFns = []

    this.unregisterFns.push(
      hotkeys(document.documentElement, 'up', () => {
        state.car.speed = Math.min(state.car.maxSpeed, state.car.speed + state.car.incrementSpeed)
      }),
      hotkeys(document.documentElement, 'down', () => {
        state.car.speed = Math.max(state.car.minSpeed, state.car.speed - state.car.incrementSpeed)
      }),
      hotkeys(document.documentElement, 'right', () => {
        state.car.wheelsAngle = Math.min(state.car.maxWheelsAngle, state.car.wheelsAngle + state.car.incrementWheelsAngle)
      }),
      hotkeys(document.documentElement, 'left', () => {
        state.car.wheelsAngle = Math.max(state.car.minWheelsAngle, state.car.wheelsAngle - state.car.incrementWheelsAngle)
      }),
    )
  }

  unregisterHotkeys() {
    this.unregisterFns.forEach(fn => fn())
  }

  handleDriveClick = () => {
    if (state.driveMode === 'auto') {
      state.driveMode = 'manual'
      this.registerHotkeys()
    }
    else {
      state.driveMode = 'auto'
      this.unregisterHotkeys()
    }

    document.documentElement.focus()
  }

  render() {
    const { driveMode } = this.props

    console.log(this.props)
    return (
      <div className="DrivePanel">
        <div>
          Drive mode: {driveMode}
        </div>
        <br />
        <div>
          <button type="button" onClick={this.handleDriveClick}>
            {driveMode === 'manual' ? 'Auto' : 'Manual'} drive
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  driveMode: s.driveMode,
})

export default connect(mapStateToProps)(App)
