import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import Button from 'react-bootstrap/Button';

class CreateNew extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: 20};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <Row>
                <Col xs={4}></Col>
                <Col>
                    <Row>
                    <Col xs={0.5} className="word">
                        <Button className="create_btn text_center" 
                            onClick={() => this.props.onClick(this.state.value)}
                            variant="info"
                        >Create
                        </Button>
                    </Col>
                    <Col xs={0.5} className="word">
                        <p className="create_text">a</p>
                    </Col>
                    <Col xs={0.5} className="word">
                        <input
                            className="input_text input_mins"
                            type="number"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </Col>
                    <Col xs={0.5} className="word">
                        <p className="create_text">mins timer</p>
                    </Col>
                    </Row>
                </Col>
                <Col xs={4}></Col>
            </Row>
        );
    }
}

export default CreateNew;