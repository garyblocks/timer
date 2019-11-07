import React from 'react';

import Container from 'react-bootstrap/Container';

import Label from './label';
import CreateNew from './create-new';
import ClockList from './clock-list';

class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.updateKey = this.updateKey.bind(this);
        this.state = {key: "light"};
    }

    updateKey() {
        const new_key = this.state.key === "light" ? "dark" : "light";
        this.setState({key: new_key})
    }

    render() {
        return (
            <Container key={this.state.key} className="animated fadeIn">
                <Label updateKey={this.updateKey} theme={this.state.key}/>
                <ClockList />
                <CreateNew />
            </Container>
        );
    }
}

export default Timer;
