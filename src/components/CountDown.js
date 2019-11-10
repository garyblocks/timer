import React from 'react';

import Col from 'react-bootstrap/Col'; 

class CountDown extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            count_down: true
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            count_down: !this.state.count_down
        });
    } 

    renderCountDown() {
        var total_secs_left = 0;
        if (!isNaN(this.props.total_secs_left)) {
            total_secs_left = Math.max(this.props.total_secs_left, 0);
        }
        const hours = Math.floor(total_secs_left / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((total_secs_left % 3600) / 60).toString().padStart(2, '0');
        const seconds = Math.round(total_secs_left % 60).toString().padStart(2, '0');
        return (
            <span
                onClick={() => this.handleClick()}
            >{hours}:{minutes}:{seconds}</span>
        );
    }

    renderCountUp() {
        var total_secs = 0;
        if (!isNaN(this.props.total_secs)) {
            total_secs = Math.max(this.props.total_secs, 0);
        }
        const hours = Math.floor(total_secs / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((total_secs % 3600) / 60).toString().padStart(2, '0');
        const seconds = Math.round(total_secs % 60).toString().padStart(2, '0');
        return (
            <span
                onClick={() => this.handleClick()}
            >{hours}:{minutes}:{seconds}</span>
        );
    }

    render() {
        return (
            <Col className="counter">
                {this.state.count_down ? this.renderCountDown() : this.renderCountUp()}
            </Col>
        )
    }
}

export default CountDown;
