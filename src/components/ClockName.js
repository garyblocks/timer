import React from 'react';
import { connect } from  "react-redux";
import { updateName } from "../redux/actions";
import { getClockById } from "../redux/selectors";

import Col from 'react-bootstrap/Col'; 

import AutosizeInput from 'react-input-autosize';

function mapStateToProps(state, ownProps) {
    const { clock } = ownProps;
    const new_clock = getClockById(clock.id)
    return { new_clock }
}

class ClockName extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            edit: false,
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

    enableEdit() {
        this.setState({
            edit: true
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
        const clock_id = this.props.clock.id;
        const new_name = event.target.value;
        this.props.updateName(clock_id, new_name);
    }

    render() {
        return (
            <Col
                className="clock_label"
                ref={node => this.node = node}
            >
                {
                    this.state.edit? <AutosizeInput
                        className="input_text input_name"
                        type="text"
                        value={this.props.clock.name}
                        onChange={this.handleChange}
                        maxLength="15"
                    /> : <span 
                        onClick={() => this.enableEdit()}
                    >{this.props.clock.name}</span>
                }
            </Col>
        );
    }
}

export default connect(
    mapStateToProps,
    { updateName }
)(ClockName);
