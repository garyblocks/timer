import React from 'react';
import ReactDOM from 'react-dom';

import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 

import Sound from 'react-sound';
import Helmet from "react-helmet";

import ClockName from './clock-name';
import CountDown from './count-down';
import CreateNew from './create-new';

class Clock extends React.Component {

    constructor (props) {
        super(props);
        const total_secs = 60 * props.total_mins;
        this.state = {
            is_paused: false,
            is_done: false,
            total_mins: props.total_mins,
            passed_secs: 0,
            total_secs: total_secs,
            prev_time: Date.now(),
            percentage: 0,
            overlay_display: "none"
        };
        this.init_state = this.state;
    }

    tick() {
        var now = Date.now();
        if (this.state.is_paused) {
            this.setState({
                prev_time: now
            })
            return;
        }
        var passed_secs = this.state.passed_secs + (now - this.state.prev_time) / 1000;
        const percentage = Math.round(100 * passed_secs / this.state.total_secs);
        var is_paused = this.state.is_paused;
        var is_done = this.state.is_done;
        if (this.state.percentage >= 100) {
            clearInterval(this.interval);
            passed_secs = 0;
            is_paused = !is_paused;
            is_done = !is_done;
            this.props.playSound();
        }
        this.setState({
            passed_secs: passed_secs,
            percentage: percentage,
            is_paused: is_paused,
            is_done: is_done,
            prev_time: now
        });
    }

    restart() {
        clearInterval(this.interval);
        this.setState(this.init_state);
        this.setState({prev_time: Date.now()})
        this.interval = setInterval(() => this.tick(), 1000);
    }

    remove() {
        this.props.onRemove(this.props.clock_id);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleClick() {
        if (this.state.is_done) {
            this.restart();
        } else {
            this.setState({
                is_paused: !this.state.is_paused
            });
        }
    }

    handleHover() {
        this.setState({
            overlay_display: "block"
        });
    }

    handleLeave() {
        this.setState({
            overlay_display: "none"
        });
    }

    changeTotalMins(n) {
        const total_secs = 60 * n;
        this.setState({
            is_paused: false,
            total_mins: n,
            passed_secs: 0,
            total_secs: total_secs,
            percentage: 0,
        });
        this.init_state = this.state;
    }

    renderOverlay() {
        let icon;
        if (this.state.is_done) {
            icon = <span className="glyphicon glyphicon-repeat overlay-text"></span>
        } else if (this.state.is_paused) {
            icon = <span className="glyphicon glyphicon-play overlay-text"></span>
        } else {
            icon = <span className="glyphicon glyphicon-pause overlay-text"></span>
        }
        return (
            <div
                className="overlay animated fadeOut"
                style={{display:this.state.overlay_display}}
                onClick={() => this.handleClick()}
                onMouseLeave={() => this.handleLeave()}
            >{icon}</div>
        )
    }

    renderBarColor() {
        if (this.state.is_done) {
            return "danger";
        } else {
            return this.state.is_paused ? "warning" : "info";
        }
    }

    render() {
        const total_secs_left = this.state.total_secs - this.state.passed_secs;
        return (
            <Row className="clock animated fadeIn">
                <ClockName clock_id={this.props.clock_id}/>
                <Col xs={7}>
                    {this.renderOverlay()}
                    <ProgressBar
                        striped
                        animated={!this.state.is_paused}
                        variant={this.renderBarColor()}
                        className="clock_progress_bar"
                        now={this.state.percentage}
                        onMouseEnter={() => this.handleHover()}
                    />
                </Col>
                <Col className="clock_time">
                    <Row>
                        <CountDown
                            total_secs_left={total_secs_left}
                            onChange={(n) => this.changeTotalMins(n)}
                        />
                        <Col onClick={() => this.restart()}>
                            <span className="glyphicon glyphicon-repeat option"></span>
                        </Col>
                        <Col onClick={() => this.remove()}>
                            <span className="glyphicon glyphicon-trash option"></span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

class Label extends React.Component {

    constructor(props) {
        super(props);
        this.state = {theme: this.props.theme};
    }

    render() {
        return (
            <>
                <Helmet>
                    <link rel="stylesheet" type="text/css" href={this.state.theme + '.css'} />
                    <link rel="stylesheet" type="text/css" href='index.css' tag={this.state.theme}/>
                </Helmet>
                <h1 className="timer_label animated fadeIn" onClick={this.props.updateKey}>Timer</h1>
            </>
        );
    }
}

class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.updateKey = this.updateKey.bind(this);
        this.state = {
            clock_count: 0,
            clock_settings: {},
            sound_status: Sound.status.STOPPED,
            key: "light"
        };
    }

    handleCreateNew(i) {
        const clock_settings = this.state.clock_settings;
        const clock_count = this.state.clock_count + 1;
        clock_settings[clock_count] = i;
        this.setState({
            clock_settings: clock_settings,
            clock_count: clock_count
        });
    }

    handleRemove(i) {
        const clock_settings = this.state.clock_settings;
        delete clock_settings[i];
        this.setState({
            clock_settings: clock_settings
        });
    }

    handleSound() {
        this.setState({
            sound_status: Sound.status.PLAYING
        })
    }

    turnOffSound() {
        this.setState({
            sound_status: Sound.status.STOPPED
        })
    }
    
    updateKey() {
        const new_key = this.state.key === "light" ? "dark" : "light";
        this.setState({key: new_key})
    }

    render() {
        const clock_settings = this.state.clock_settings;
        var clocks = [];
        for (var clock_id in clock_settings) {
            if (clock_settings.hasOwnProperty(clock_id)) {
                const setting = clock_settings[clock_id];
                clocks.push(
                    <Clock
                        key={clock_id}
                        total_mins={setting}
                        clock_id={clock_id}
                        onRemove={this.handleRemove.bind(this)}
                        playSound={this.handleSound.bind(this)}
                    />
                );
            }
        }

        return (
            <Container key={this.state.key} className="animated fadeIn">
                <Label updateKey={this.updateKey} theme={this.state.key}/>
                {clocks}
                <CreateNew onClick={(i) => this.handleCreateNew(i)} />
                <Sound
                    url="meow.mp3"
                    playStatus={this.state.sound_status}
                    volume={30}
                    onFinishedPlaying={() => this.turnOffSound()}
                />
            </Container>
        );
    }
}

ReactDOM.render(
  <Timer />,
  document.getElementById('root')
);
