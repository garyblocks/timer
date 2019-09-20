import React from 'react';

import Col from 'react-bootstrap/Col'; 

class ClockName extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            name: "Clock " + props.clock_id,
            edit: false
        };
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
        this.setState({
            edit: false
        });
    } 

    handleChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    render() {
        return (
            <Col
                className="clock_label"
                onDoubleClick={() => this.handleDoubleClick()}
                ref={node => this.node = node}
            >
                {
                    this.state.edit? <input
                        className="input_text input_name"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                    /> : <span>{this.state.name}</span>
                }
            </Col>
        );
    }
}

export default ClockName;