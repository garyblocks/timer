import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import ProgressBar from 'react-bootstrap/ProgressBar';

import ClockName from './clock-name';
import CountDown from './count-down';

class Clock extends React.Component {

    constructor (props) {
        super(props);
        const total_secs = 60 * props.total_mins;
        this.state = {
            is_paused: false,
            is_done: false,
            restart: false,
            total_mins: props.total_mins,
            passed_secs: 0,
            total_secs: total_secs,
            prev_time: Date.now(),
            percentage: 0,
            overlay_key: 0
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
            prev_time: now,
        });
    }

    restart() {
        clearInterval(this.interval);
        this.setState(this.init_state);
        this.setState({
            prev_time: Date.now(),
            restart: true
        })
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
            this.setState({
                overlay_key: this.state.overlay_key + 1,
            });
        } else {
            this.setState({
                restart: false,
                is_paused: !this.state.is_paused,
                overlay_key: this.state.overlay_key + 1
            });
        }
    }

    changeTotalMins(n) {
        const total_secs = 60 * n;
        this.setState({
            is_paused: false,
            is_done: false,
            total_mins: n,
            passed_secs: 0,
            total_secs: total_secs,
            percentage: 0
        });
        this.init_state = this.state;
        this.restart();
    }

    renderOverlay() {
        let icon;
        if (this.state.restart) {
            icon = <span className="glyphicon glyphicon-repeat overlay-text fade-out"></span>
        } else if (this.state.is_paused) {
            icon = <span className="glyphicon glyphicon-pause overlay-text fade-out"></span>
        } else {
            icon = <span className="glyphicon glyphicon-play overlay-text fade-out"></span>
        }
        return (
            <div
                className="overlay"
                onClick={() => this.handleClick()}
                key={this.state.overlay_key}
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
                        onClick={() => this.handleClick()}
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

export default Clock;
