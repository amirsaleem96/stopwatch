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
            buttons: [
                {
                    type: 'start', 
                    text: 'Start',
                    class: 'btn btn-success stopwatch-controller',
                    disabled: false
                },
                { 
                    type: 'snapshot',
                    text: 'Snapshot',
                    class: 'btn btn-primary stopwatch-controller',
                    disabled: false
                },
                { 
                    type: 'reset',
                    text: 'Reset',
                    class: 'btn btn-danger stopwatch-controller',
                    disabled: false
                }, 
                { 
                    type: 'clear-snapshots',
                    text: 'Clear Snapshots',
                    class: 'btn btn-primary stopwatch-controller',
                    disabled: false
                }
            ]
        };
        this.handleWatch = this.handleWatch.bind(this);
        this.incrementTimer = this.incrementTimer.bind(this);
        this.renderSnapshots = this.renderSnapshots.bind(this);
    }
    componentDidMount() {
        console.log("%c...GEEK?","color:teal;font-size:30px;font-weight:900;font-family:sans-serif");
        console.log("%cWe are hiring!","color:orange;font-size:25px;font-family:sans-serif;");
    }
    handleWatch(type, index) { 
        let snapshots = this.state.snapshots;
        let { minutes, seconds, milliseconds, buttons } = this.state;
        let pauseButton =  {
            type: 'pause',
            text: 'Pause',
            class: 'btn btn-primary stopwatch-controller',
            disabled: false
        }
        let startButton = {
            type: 'start',
            text: 'Start',
            class: 'btn btn-success stopwatch-controller',
            disabled: false
        }
        minutes = this.getDoubleValue(minutes);
        seconds = this.getDoubleValue(seconds);
        milliseconds = this.getDoubleValue(milliseconds);
        buttons.forEach((aButton) => {
            aButton['disabled'] = false;
        });
        switch(type) {
            case 'start':   let watchHandle = setInterval(this.incrementTimer, 1);
                            buttons[index] = pauseButton;
                            this.setState({ watchHandle });
                            break;
            case 'snapshot' :   if(minutes == 0 && seconds == 0 && milliseconds == 0){
                                    alert('OOPS! it seems there is nothing to take snapshot of.');
                                    return;
                                }
                                snapshots.push({ minutes, seconds, milliseconds });
                                this.setState({ snapshots })
                                break;
            case 'pause' :  clearInterval(this.state.watchHandle); 
                            buttons[index] = startButton;
                            this.setState({ buttons });
                            break;
            case 'reset' : clearInterval(this.state.watchHandle);
                            buttons[0] = startButton;
                            buttons[index]['disabled'] = true;
                            this.setState({ minutes: 0, seconds: 0, milliseconds: 0 });
                            break;
            case 'clear-snapshots' : clearInterval(this.state.watchHandle);
                                     buttons[index]['disabled'] = true;
                                     this.setState({ snapshots: [] });
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
            return  <li className = 'list-group-item' key = {index}>
                        <strong>{`${elem.minutes}:${elem.seconds}:${elem.milliseconds}`}</strong>
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
        let { minutes, seconds, milliseconds } = this.state;
        return(
            <div className = 'stopwatch-container'>
                <div>
                    <p className = 'watch-data'>
                        <span>{ this.getDoubleValue(minutes) }<span className = 'semicolon'>:</span></span>
                        <span>{ this.getDoubleValue(seconds) }<span className = 'semicolon'>:</span></span>
                        <span>{ this.getDoubleValue(milliseconds) }</span>
                    </p>
                    <div className = 'controller-wrapper'>
                    {
                        this.state.buttons.map((btn, index) => {
                            return  <button className = { btn.class } key = {index} onClick = { 
                                            (e) => { this.handleWatch( btn.type, index ) } 
                                         } disabled = {btn.disabled}>
                                        { btn.text }
                                    </button>
                        })
                    }
                    </div>
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