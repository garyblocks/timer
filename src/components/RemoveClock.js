import React from "react";
import Col from 'react-bootstrap/Col'; 
import { connect } from "react-redux";
import { removeClock } from "../redux/actions";

const RemoveClock = ({ clock_id, removeClock }) => (
    <Col
        onClick={() => {
            removeClock(clock_id);
        }}
    >
        <span className="glyphicon glyphicon-trash option"></span>
    </Col>
);

export default connect(
    null,
    { removeClock }
)(RemoveClock);
