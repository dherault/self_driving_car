import React from 'react'

import state, { listeners } from './state'

function connect(mapStateToProps) {

  return Component => {

    class ConnectedComponent extends React.Component {

      componentDidMount() {
        this.listener = () => this.forceUpdate()

        listeners.push(this.listener)
      }

      componentWillUnmount() {
        const index = listeners.indexOf(this.listener)

        listeners.splice(index, 1)
      }

      render() {
        return <Component {...mapStateToProps(state)} />
      }
    }

    return ConnectedComponent 
  }
}

export default connect
