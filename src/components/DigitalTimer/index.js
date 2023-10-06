/* Write your CSS here */
// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isStarted: false, timeMinutes: 25, timeSeconds: 0}

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  onClickDecrease = () => {
    const {timeMinutes} = this.state
    if (timeMinutes > 1) {
      this.setState(prevState => ({timeMinutes: prevState.timeMinutes - 1}))
    }
  }

  onClickIncrease = () => {
    const {timeMinutes} = this.state
    if (timeMinutes > 1) {
      this.setState(prevState => ({timeMinutes: prevState.timeMinutes + 1}))
    }
  }

  onClickReset = () => {
    this.clearTimeInterval()
    this.setState({
      isStarted: false,
      timeMinutes: 25,
      timeSeconds: 0,
    })
  }

  onIncrement = () => {
    const {isStarted, timeMinutes, timeSeconds} = this.state
    const isCompleted = timeSeconds === timeMinutes * 60
    if (isCompleted) {
      this.clearTimeInterval()
      this.setState({isStarted: false})
    } else {
      this.setState(prevState => ({timeSeconds: prevState.timeSeconds + 1}))
    }
  }

  startPause = () => {
    const {isStarted, timeMinutes, timeSeconds} = this.state

    const isCompleted = timeSeconds === timeMinutes * 60
    if (isCompleted) {
      this.setState({timeSeconds: 0})
    }
    if (isStarted) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.onIncrement, 1000)
    }
    this.setState(prevState => ({isStarted: !prevState.isStarted}))
  }

  getFormat = () => {
    const {timeMinutes, timeSeconds} = this.state
    const remainingSec = timeMinutes * 60 - timeSeconds
    const minutes = Math.floor(remainingSec / 60)
    const seconds = Math.floor(remainingSec % 60)
    const formattedminutes = minutes > 9 ? minutes : `0${minutes}`
    const formattedseconds = seconds > 9 ? seconds : `0${seconds}`
    return `${formattedminutes}:${formattedseconds}`
  }

  render() {
    const {isStarted, timeMinutes, timeSeconds} = this.state
    const disableButton = timeSeconds > 0

    const pauseIcon =
      'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const playIcon =
      'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    return (
      <div className="bg">
        <h1>Digital Timer</h1>
        <div className="cont">
          <h1>{this.getFormat()}</h1>
          <p>{isStarted ? 'Running' : 'Paused'}</p>
        </div>
        <div className="cont">
          <button onClick={this.startPause}>
            <img
              src={isStarted ? pauseIcon : playIcon}
              alt={isStarted ? 'pause icon' : 'play icon'}
            />
            <p>{isStarted ? 'Pause' : 'Start'}</p>
          </button>
        </div>
        <div className="cont">
          <button onClick={this.onClickReset}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
            />
            <p>Reset</p>
          </button>
        </div>
        <div className="cont">
          <p>Set Timer limit</p>
          <button disabled={disableButton} onClick={this.onClickDecrease}>
            -
          </button>
          <p>{timeMinutes}</p>
          <button disabled={disableButton} onClick={this.onClickIncrease}>
            +
          </button>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
