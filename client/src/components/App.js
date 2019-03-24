import React, { Component } from 'react'
import './App.css'

import registerCanvas from '../lib/registerCanvas'

class App extends Component {

  componentDidMount() {
    const canvas = document.getElementById('App-canvas')
    
    this.resizeCanvasListener = () => this.resizeCanvas(canvas)
    
    window.addEventListener('resize', this.resizeCanvasListener)
    
    this.resizeCanvas(canvas)
    
    this.unregisterCanvas = registerCanvas(canvas)
  }

  componentWillUnmount() {
    this.unregisterCanvas()
    window.removeEventListener('resize', this.resizeCanvasListener)
  }

  resizeCanvas(canvas) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight - 3
  }

  render() {
    return (
      <div className="App">
        <canvas
          id="App-canvas"
          tabIndex={0}
        />
      </div>
    )
  }
}

export default App
