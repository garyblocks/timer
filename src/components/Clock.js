import React from 'react';
import { connect } from "react-redux";
import { updateTime, updateStat, toggleIcon, toggleFirst} from "../redux/actions";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import ProgressBar from 'react-bootstrap/ProgressBar';
import Sound from 'react-sound';

import CountDown from './CountDown'; 
import ClockName from './ClockName';
import RemoveClock from './RemoveClock';

class Clock extends React.Component {

    constructor(props) {
        super(props);
        const total_secs = props.clock.secs;
        this.state = {
            total_secs: props.clock.secs,
            prev_time: Date.now(),
            percentage: this.getPercentage(props.clock.time, total_secs),
            overlay_key: 0,
            sound_status: Sound.status.STOPPED
        };
        this.init_state = this.state;
        if (props.clock.first) {
            this.props.toggleFirst(this.props.clock.id, false);
        } else {
            this.props.toggleIcon(this.props.clock.id, false);
        }
    }

    getPercentage(passed_secs, total_secs) {
        const percentage = Math.round(100 * passed_secs / total_secs);
        return percentage;
    }

    tick() {
        var now = Date.now();
        if (this.props.clock.stat === 'PAUSE') {
            this.setState({
                prev_time: now
            })
            return;
        }
        const elapsed_secs = (now - this.state.prev_time) / 1000;
        var passed_secs = this.props.clock.time + elapsed_secs;
        const percentage = Math.round(100 * passed_secs / this.state.total_secs);
        if (this.state.percentage >= 100) {
            clearInterval(this.interval);
            passed_secs = 0;
            this.props.updateStat(this.props.clock.id, 'STOP');
            this.playSound();
        }
        this.props.updateTime(this.props.clock.id, passed_secs);
        this.setState({
            percentage: percentage,
            prev_time: now,
        });
    }

    restart() {
        this.props.toggleIcon(this.props.clock.id, true);
        clearInterval(this.interval);
        this.props.updateTime(this.props.clock.id, 0);
        this.setState(this.init_state);
        this.props.updateStat(this.props.clock.id, 'RESTART');
        this.setState({
            prev_time: Date.now(),
        })
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleClick() {
        this.props.toggleIcon(this.props.clock.id, true);
        switch (this.props.clock.stat) {
            case 'STOP': {
                this.restart();
                break;
            }
            case 'PAUSE': {
                this.props.updateStat(this.props.clock.id, 'RUN');
                break;
            }
            case 'RUN': {
                this.props.updateStat(this.props.clock.id, 'PAUSE');
                break;
            }
            case 'RESTART': {
                this.props.updateStat(this.props.clock.id, 'PAUSE');
                break;
            }
            default:
                break
        }

        this.setState({
            overlay_key: this.state.overlay_key + 1,
        });
    }

    playSound() {
        this.setState({
            sound_status: Sound.status.PLAYING
        })
    }

    turnOffSound() {
        this.setState({
            sound_status: Sound.status.STOPPED
        })
    }

    renderOverlay() {
        let icon;
        if (!this.props.clock.icon) {
            icon = <span className="overlay-text"></span>;
        } else if (this.props.clock.stat === 'RESTART') {
            icon = <span className="glyphicon glyphicon-repeat overlay-text fade-out"></span>
        } else if (this.props.clock.stat === 'PAUSE') {
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
        if (this.props.clock.stat === 'STOP') {
            return "danger";
        } else if (this.props.clock.stat === 'PAUSE') {
            return "warning";
        } else {
            return "info";
        }
    }

    renderProgressBar() {
        return (
            <ProgressBar
                striped
                animated={this.props.clock.stat === 'PAUSE' ? false : true}
                variant={this.renderBarColor()}
                className="clock_progress_bar"
                now={this.state.percentage}
                onClick={() => this.handleClick()}
            />
        )
    }

    render() {
        const total_secs_left = this.state.total_secs - this.props.clock.time;
        return (
            <Row className="clock animated fadeIn">
                <ClockName clock={this.props.clock} xs={2}/>
                <Col xs={7}>
                    {this.renderOverlay()}
                    {this.renderProgressBar()}
                </Col>
                <Col className="clock_time">
                    <Row>
                        <CountDown
                            total_secs_left={total_secs_left}
                            total_secs={this.props.clock.time}
                            clock={this.props.clock}
                        />
                        <Col onClick={() => this.restart()}>
                            <span className="glyphicon glyphicon-repeat option"></span>
                        </Col>
                        <RemoveClock clock_id={this.props.clock.id} />
                    </Row>
                </Col>
                <Sound
                    url="meow.mp3"
                    playStatus={this.state.sound_status}
                    volume={30}
                    onFinishedPlaying={() => this.turnOffSound()}
                />
            </Row>
        );
    }
}

export default connect(
    null,
    { updateTime, updateStat, toggleIcon, toggleFirst }
)(Clock);
