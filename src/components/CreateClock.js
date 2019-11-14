import React from 'react';

import { connect } from 'react-redux';
import { addClock } from '../redux/actions';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';

import AutosizeInput from 'react-input-autosize';

class CreateClock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 20,
            unit: 'mins',
            warn: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.changeUnit = this.changeUnit.bind(this);
    }

    handleChange(event) {
        if (event.target.value <= 9999) {
            const total_mins = event.target.value;
            this.setState({value: total_mins});
        }
    }

    handleToggleWarn() {
        this.setState({warn: false});
    }

    handleAddClock = () => {
        if (this.state.value <= 0) {
            this.setState({ warn: true });
            return;
        }
        const unit = this.state.unit;
        switch (unit) {
            case 'seconds':
                this.props.addClock(this.state.value);
                break;
            case 'hours':
                this.props.addClock(this.state.value * 3600);
                break;
            case 'days':
                this.props.addClock(this.state.value * 86400);
                break;
            default:
                this.props.addClock(this.state.value * 60);
        }
    }

    changeUnit(event) {
        const unit = event.target.innerText;
        this.setState({unit:unit});
    }

    renderAlert() {
        if (!this.state.warn) {
            return;
        }
        return (
            <Alert
                variant="danger"
                className="align-self-center"
                onClick={() => this.handleToggleWarn()}
            >
                Invalid Number
            </Alert>
        )
    }

    render() {
        return (
            <>
            <Row><Col>{this.renderAlert()}</Col></Row>
            <Row>
                <Col xs={4} md={4}></Col>
                <Col>
                    <Row>
                    <Col xs={12} md={3} className="word align-self-center">
                        <Button className="create_btn text_center" 
                            onClick={this.handleAddClock}
                            variant="info"
                        >Create
                        </Button>
                    </Col>
                    <Col xs={12} md={1} className="word align-self-center">
                        <p className="create_text">a</p>
                    </Col>
                    <Col xs={12} md={2} className="word align-self-flex-start">
                        <AutosizeInput
                            className="input_text input_mins"
                            type="number"
                            value={this.state.value}
                            onChange={this.handleChange}
                            maxLength="4"
                        />
                    </Col>
                    <Col xs={12} md={3} className="word align-self-center">
                        <Dropdown className="text_center">
                            <Dropdown.Toggle
                                variant="info"
                                id="dropdown-basic"
                                className="create_btn"
                            >{this.state.unit}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item
                                    className="dropdown-option"
                                    onClick={this.changeUnit}
                                >seconds</Dropdown.Item>
                                <Dropdown.Item
                                    className="dropdown-option"
                                    onClick={this.changeUnit}
                                >mins</Dropdown.Item>
                                <Dropdown.Item
                                    className="dropdown-option"
                                    onClick={this.changeUnit}
                                >hours</Dropdown.Item>
                                <Dropdown.Item
                                    className="dropdown-option"
                                    onClick={this.changeUnit}
                                >days</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col xs={12} md={2} className="word align-self-center">
                        <p className="create_text">timer</p>
                    </Col>
                    </Row>
                </Col>
                <Col xs={4} md={3}></Col>
            </Row>
            </>
        );
    }
}

export default connect(
    null,
    { addClock }
)(CreateClock);
