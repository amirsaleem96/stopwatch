import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';

// This is a main container for stopwatch

class StopwatchContainer extends Component {
    // constructor method
    constructor(props) {
        super(props);
        this.state = {
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
            watchHandle: null,
            snapshots: [],
            buttons: ['start','snapshot','pause','reset']
        };
        this.handleWatch = this.handleWatch.bind(this);
        this.incrementTimer = this.incrementTimer.bind(this);
        this.renderSnapshots = this.renderSnapshots.bind(this);
    }
    componentDidMount() {
        console.log("%c...GEEK?","color:teal;font-size:30px;font-weight:900;font-family:sans-serif");
        console.log("%cWe are hiring!","color:orange;font-size:25px;font-family:sans-serif;");
    }
    handleWatch(type) { 
        switch(type) {
            case 'start' : let watchHandle = setInterval(this.incrementTimer, 1);
                            this.setState({ watchHandle });
                            break;
            case 'snapshot' :   let snapshots = this.state.snapshots;
                                var { minutes, seconds, milliseconds } = this.state;
                                if(minutes == 0 && seconds == 0 && milliseconds == 0){
                                    alert('OOPS! it seems there is nothing to take snapshot of.');
                                    return;
                                }
                                minutes = this.getDoubleValue(minutes);
                                seconds = this.getDoubleValue(seconds);
                                milliseconds = this.getDoubleValue(milliseconds);
                                snapshots.push({ minutes, seconds, milliseconds });
                                this.setState({ snapshots })
                                break;
            case 'pause' : clearInterval(this.state.watchHandle);   
                            break;
            case 'reset' : clearInterval(this.state.watchHandle);
                            var userConfirm = confirm('reset snapshot as well ?');
                            if(userConfirm){
                                this.setState({
                                    minutes: 0,
                                    seconds: 0,
                                    milliseconds: 0,
                                    snapshots: []
                                });
                            } else {
                                this.setState({
                                    minutes: 0,
                                    seconds: 0,
                                    milliseconds: 0
                                });
                            }
                            break;
            default : return
        }
    }
    // method to increment milliseconds, seconds and minutes
    incrementTimer() {
        let { milliseconds, seconds, minutes } = this.state;
        milliseconds++;
        if(milliseconds >= 100 ){
            milliseconds = 0;
            seconds++;
            if(seconds >= 60){
                seconds = 0;
                minutes++;
            }
        }
        this.setState({ milliseconds, seconds, minutes });
    }
    getDoubleValue(val) {
        val > 9 ? val = val : val = `0${val}`;
        return val;
    }
    renderSnapshots() {
        return this.state.snapshots.map((elem, index) => {
            return  <li 
                        className = 'list-group-item' 
                        key = {index}>
                        {`${elem.minutes}:${elem.seconds}:${elem.milliseconds}`}
                        <i className = 'fa fa-trash delete-snapshot' onClick = {() => {
                            let snapshots = this.state.snapshots;
                            snapshots.splice(index,1);
                            this.setState({ snapshots });
                        }}></i>
                    </li>
        })
    }
    // render method
    render() {
        // returning JSX
        var { minutes, seconds, milliseconds } = this.state;
        return(
            <div className = 'stopwatch-container'>
                <div>
                    <p>
                        <span>{ this.getDoubleValue(minutes) }:</span>
                        <span>{ this.getDoubleValue(seconds) }:</span>
                        <span>{ this.getDoubleValue(milliseconds) }</span>
                        <span id = "status"></span>
                    </p>
                    {
                        this.state.buttons.map((btn, index) => {
                            return <button key = {index} onClick = {() => {this.handleWatch(btn)}}>{btn}</button>
                        })
                    }
                    <ul className = 'list-group'>
                        { this.renderSnapshots() }
                    </ul>
                </div>
            </div>
        )
    }
}

// exporting the stopwatch so that other files can make use of this

export default StopwatchContainer;