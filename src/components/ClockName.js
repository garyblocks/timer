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

    enableEdit(event) {
        this.setState({
            edit: true
        });
    }

    handleClick(event) {
        if (this.node.contains(event.target)) {
            return;
        }
        // make sure the input field is not left empty
        const current_name = this.props.clock.name;
        if (!current_name) {
            const clock_id = this.props.clock.id;
            this.props.updateName(clock_id, 'undefined');
        }
        this.setState({
            edit: false
        });
    } 

    handleChange(event) {
        const clock_id = this.props.clock.id;
        const input_value = event.target.value;
        this.props.updateName(clock_id, input_value);
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
                        draggable="true"
                        onFocus={e => {e.target.select()}}
                        onDragStart={e => {
                            e.preventDefault();
                        }} 
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
