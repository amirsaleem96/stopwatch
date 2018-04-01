import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import { addSnapshot, deleteSnapshot } from '../actions/index';

const prettyPrint = (message, styles) => {
    message = `%c${message}`;
    let cssStyles = "";
    for(var key in styles){
        cssStyles += `${key}:${styles[key]};`;
    }
    console.log(message, cssStyles);
}

/**
 * @description: Component to render stopwatch
 * @redux: Snaphots are stored in redux state
 * @param: none
 */ 

class StopwatchContainer extends Component {
    // constructor method
    constructor(props) {
        super(props);
        // component level state
        this.state = {
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
            watchHandle: null,
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
    // print some cool messages on console as soon as the component is mounted in DOM
    componentDidMount() {
        console.log(this.props);
       let styles = {
           'color': 'teal',
           'font-size': '50px',
           'font-weight': '900'
       }
       prettyPrint('GEEK?', styles);
    }
    // handle watch states on button click
    handleWatch(type, index) { 
        let snapshots = this.state.snapshots;
        let { minutes, seconds, milliseconds, buttons } = this.state;
        // pause button object
        let pauseButton =  {
            type: 'pause',
            text: 'Pause',
            class: 'btn btn-primary stopwatch-controller',
            disabled: false
        }
        // start button object
        let startButton = {
            type: 'start',
            text: 'Start',
            class: 'btn btn-success stopwatch-controller',
            disabled: false
        }
        minutes = this.getDoubleValue(minutes);
        seconds = this.getDoubleValue(seconds);
        milliseconds = this.getDoubleValue(milliseconds);
        // enable all buttons
        buttons.forEach((aButton) => {
            aButton['disabled'] = false;
        });
        switch(type) {
            case 'start':   let watchHandle = setInterval(this.incrementTimer, 1);
                            // start button is clicked, change start button to pause button
                            buttons[index] = pauseButton;
                            this.setState({ watchHandle });
                            break;
            case 'snapshot' :   // initial state? snapshots cannot be taken
                                if(minutes == 0 && seconds == 0 && milliseconds == 0){
                                    alert('OOPS! it seems there is nothing to take snapshot of.');
                                    return;
                                }
                                this.props.addSnapshot( { minutes, seconds, milliseconds } );
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
            case 'clear-snapshots' : buttons[index]['disabled'] = true;
                                     this.props.getSnapshots( [] );
                                     break;
            default : return
        }
    }
    // method to increment milliseconds, seconds and minutes
    incrementTimer() {
        let { milliseconds, seconds, minutes } = this.state;
        milliseconds++;
        // 100 milliseconds have been passed?
        if(milliseconds >= 100 ){
            // start milliseconds with zero
            milliseconds = 0;
            // increment seconds by 1
            seconds++;
            // 60 seconds have been passed ? time to increment the minute
            if(seconds >= 60){
                // set seconds to 0
                seconds = 0;
                // increment minutes by 1
                minutes++;
            }
        }
        // set the new state
        this.setState({ milliseconds, seconds, minutes });
    }
    // value is less than 9 ? prepend 0 to make it double digit
    getDoubleValue(val) {
        val > 9 ? val = val : val = `0${val}`;
        return val;
    }
    // method to render snapshots taken by user (snapshots are coming from reducer)
    renderSnapshots() {
        return this.props.snapshots.map((elem, index) => {
            return  <li className = 'list-group-item' key = {index}>
                        <strong>{`${elem.minutes}:${elem.seconds}:${elem.milliseconds}`}</strong>
                        <i className = 'fa fa-trash delete-snapshot' onClick = {() => {
                            this.props.deleteSnapshot( index );
                        }}></i>
                    </li>
        })
    }
    // render method
    render() {
        // returning JSX
        let { minutes, seconds, milliseconds } = this.state;
        return(
            // main stopwatch container
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

// get the state from reducer

function mapStateToProps( snapshots ) {
    return snapshots;
}

// connect StopwatchContainer to Application Level Redux State
export default connect(mapStateToProps, { addSnapshot, deleteSnapshot })(StopwatchContainer);