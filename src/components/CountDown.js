import React from 'react';
import { connect } from "react-redux";
import { toggleCount } from "../redux/actions";

import Col from 'react-bootstrap/Col'; 

class CountDown extends React.Component {

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.toggleCount(this.props.clock.id);
    } 

    getTimeStrings(total_secs) {
        const day_count = Math.floor(total_secs / 86400).toString();
        const hours = Math.floor((total_secs % 86400) / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((total_secs % 3600) / 60).toString().padStart(2, '0');
        const seconds = Math.round(total_secs % 60).toString().padStart(2, '0');
        var days = '';
        if (day_count === '0') {
            days = '';
        } else if (day_count === '1') {
            days = '1 day ';
        } else {
            days = day_count + ' days ';
        }
        return [days, hours, minutes, seconds];
    }

    renderCountDown() {
        var total_secs_left = 0;
        if (!isNaN(this.props.total_secs_left)) {
            total_secs_left = Math.max(this.props.total_secs_left, 0);
        }
        const [days, hours, minutes, seconds] = this.getTimeStrings(total_secs_left);
        return (
            <span onClick={() => this.handleClick()} >
                {days}{hours}:{minutes}:{seconds}
            </span>
        );
    }

    renderCountUp() {
        var total_secs = 0;
        if (!isNaN(this.props.total_secs)) {
            total_secs = Math.max(this.props.total_secs, 0);
        }
        const [days, hours, minutes, seconds] = this.getTimeStrings(total_secs);
        return (
            <span onClick={() => this.handleClick()} >
                {days}{hours}:{minutes}:{seconds}
            </span>
        );
    }

    render() {
        return (
            <Col className="counter">
                {this.props.clock.count_down ? this.renderCountDown() : this.renderCountUp()}
            </Col>
        )
    }
}

export default connect(
    null,
    { toggleCount }
)(CountDown);
