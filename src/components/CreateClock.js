import React from 'react';

import { connect } from 'react-redux';
import { addClock } from '../redux/actions';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import Button from 'react-bootstrap/Button';

class CreateClock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: 20};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const total_mins = event.target.value;
        this.setState({value: total_mins});
    }

    handleAddClock = () => {
        this.props.addClock(this.state.value * 60);
    }

    render() {
        return (
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
                    <Col xs={12} md={2} className="word align-self-center">
                        <input
                            className="input_text input_mins"
                            type="number"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </Col>
                    <Col xs={12} md={4} className="word align-self-center">
                        <p className="create_text">mins timer</p>
                    </Col>
                    </Row>
                </Col>
                <Col xs={4} md={4}></Col>
            </Row>
        );
    }
}

export default connect(
    null,
    { addClock }
)(CreateClock);
