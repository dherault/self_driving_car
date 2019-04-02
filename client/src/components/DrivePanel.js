import React, { PureComponent } from 'react'
import hotkeys from 'piano-keys'

import './index.css'

import connect from '../lib/connect'
import state from '../lib/state'
import { driveAuto, driveLearn } from '../lib/drive'

class App extends PureComponent {

  componentDidMount() {
    if (state.driveMode === 'manual') {
      this.registerHotkeys()
    }
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
    this.unregisterFns = null
  }

  handleDriveClick = (driveMode) => {
    state.driveMode = driveMode

    if (driveMode === 'manual') {
      if (typeof this.cancelDriveAuto === 'function') this.cancelDriveAuto()
      if (typeof this.cancelDriveLearn === 'function') this.cancelDriveLearn()

      this.registerHotkeys()
      document.documentElement.focus()

      return
    }

    if (driveMode === 'auto') {
      if (this.unregisterFns) this.unregisterHotkeys()
      if (typeof this.cancelDriveLearn === 'function') this.cancelDriveLearn()

      this.cancelDriveAuto = driveAuto()

      return
    }

    if (driveMode === 'learn') {
      if (this.unregisterFns) this.unregisterHotkeys()
      if (typeof this.cancelDriveAuto === 'function') this.cancelDriveAuto()

      this.cancelDriveLearn = driveLearn()

      return
    }
  }

  render() {
    const { driveMode } = this.props

    return (
      <div className="DrivePanel">
        <div>
          Drive mode: {driveMode}
        </div>
        <br />
        <div>
          <button type="button" onClick={() => this.handleDriveClick('manual')}>
            Manual drive
          </button>
          <button type="button" onClick={() => this.handleDriveClick('auto')}>
            Auto drive
          </button>
          <button type="button" onClick={() => this.handleDriveClick('learn')}>
            Learn
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
