import React from 'react';

import Col from 'react-bootstrap/Col'; 

class CountDown extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            edit: false,
            total: props.total_mins
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }


    handleDoubleClick() {
        this.setState({
            edit: !this.state.edit
        });
    }

    handleClick(event) {
        if (this.node.contains(event.target)) {
            return;
        }
        if (this.state.edit) {
            this.setState({
                edit: false
            });
            this.props.onChange(this.state.total);
        }
    } 

    handleChange(event) {
        const new_total = event.target.value;
        this.setState({
            total: new_total
        });
    }

    renderInput() {
        return (
            <input
                className="input_text input_new_total"
                type="number"
                value={this.state.total}
                onChange={this.handleChange}
            />
        );
    }

    renderTime() {
        const total_secs_left = this.props.total_secs_left;
        const hours = Math.floor(total_secs_left / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((total_secs_left % 3600) / 60).toString().padStart(2, '0');
        const seconds = Math.round(total_secs_left % 60).toString().padStart(2, '0');
        return (
            <span>{hours}:{minutes}:{seconds}</span>
        );
    }

    render() {
        return (
            <Col
                onDoubleClick={() => this.handleDoubleClick()}
                ref={node => this.node = node}
            >
                {this.state.edit? this.renderInput() : this.renderTime()}
            </Col>
        )
    }
}

export default CountDown;
