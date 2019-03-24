import draw from './draw'

function registerCanvas(canvas) {
  
  // A function called once for registering the canvas event listeners
  console.log('registering canvas')

  // For global canvas access, do not remove
  window.canvas = canvas

  const _ = canvas.getContext('2d')

  let requestId

  // Draw the canvas
  const drawStep = () => {
    draw(_)
    requestId = requestAnimationFrame(drawStep)
  }

  console.log('drawing canvas')
  
  requestId = requestAnimationFrame(drawStep)

  canvas.focus()

  // Return unregisterCanvas
  return () => {
    console.log('unregistering canvas')

    cancelAnimationFrame(requestId)
  }
}

export default registerCanvas
