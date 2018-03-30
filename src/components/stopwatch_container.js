import React, { Component } from 'react';
import { connect } from 'react-redux';

// This is a main container for stopwatch

class StopwatchContainer extends Component {
    // constructor method
    constructor(props) {
        super(props);
        this.state = {
            minutes: '00',
            seconds: '00',
            milliseconds: '00',
            watchHandle: null,
            snapshots: []
        };
        this.handleWatch = this.handleWatch.bind(this);
        this.incrementTimer = this.incrementTimer.bind(this);
    }
    handleWatch(type) {
        switch(type) {
            case 'start' : let watchHandle = setInterval(this.incrementTimer, 1);
                            this.setState({ watchHandle });
                            break;
            case 'snapshot' :   let snapshots = this.state.snapshots;
                                var { minutes, seconds, milliseconds } = this.state;
                                minutes > 9 ? minutes : `0${minutes}`;
                                seconds > 9 ? seconds : `0${seconds}`;
                                milliseconds > 9 ? milliseconds : `0${milliseconds}`;
                                snapshots.push({ minutes, seconds, milliseconds });
                                this.setState({ snapshots })
                                break;
            case 'pause' : clearInterval(this.state.watchHandle);   
                            break;
            case 'reset' : clearInterval(this.state.watchHandle);
                            this.setState({
                                minutes: '00',
                                seconds: '00',
                                milliseconds: '00',
                                snapshots: []
                            });
                            break;
            default : return
        }
    }
    incrementTimer() {
        let { milliseconds, seconds, minutes } = this.state;
        milliseconds++;
        if(milliseconds >= 60 ){
            milliseconds = 0;
            seconds++;
            if(seconds >= 60){
                seconds = 0;
                minutes++;
            }
        }
        this.setState({ milliseconds, seconds, minutes })
    }
    // render method
    render() {
        // returning JSX
        var { minutes, seconds, milliseconds } = this.state;
        minutes > 9 ? minutes : `0${minutes}`;
        seconds > 9 ? seconds : `0${seconds}`;
        milliseconds > 9 ? milliseconds : `0${milliseconds}`;
        return(
            <div className = 'stopwatch-container'>
                <div>
                    <p>
                        <span>{minutes}:</span>
                        <span>{seconds}:</span>
                        <span>{milliseconds}</span>
                    </p>
                    <button onClick = {() => {this.handleWatch('start')}}>Start</button>
                    <button onClick = {() => {this.handleWatch('snapshot')}}>Snapshot</button>
                    <button onClick = {() => {this.handleWatch('pause')}}>Pause</button>
                    <button onClick = {() => {this.handleWatch('reset')}}>Reset</button>
                    <ul>
                    {
                        this.state.snapshots.map((elem, index) => {
                            return <li key = {index}>{`${elem.minutes}:${elem.seconds}:${elem.milliseconds}`}</li>
                        })
                    }
                    </ul>
                </div>
            </div>
        )
    }
}

// exporting the stopwatch so that other files can make use of this

export default StopwatchContainer;