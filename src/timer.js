import React from 'react';

import Container from 'react-bootstrap/Container';

import Label from './components/Label';
import CreateClock from './components/CreateClock';
import ClockList from './components/ClockList';

class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.updateKey = this.updateKey.bind(this);
        this.toggleMute = this.toggleMute.bind(this);
        this.state = {
            key: "light",
            mute: false
        };
    }

    updateKey() {
        const new_key = this.state.key === "light" ? "dark" : "light";
        this.setState({key: new_key})
    }

    toggleMute() {
        const new_mute = !this.state.mute;
        this.setState({mute: new_mute});
    }

    render() {
        return (
            <>
            <Container key={this.state.key} className="animated fadeIn">
                <Label updateKey={this.updateKey} theme={this.state.key}/>
                <ClockList mute={this.state.mute}/>
                <CreateClock />
            </Container>
            <div
                className="footer"
                onClick={this.toggleMute}
            >
                {this.state.mute?
                <span className="glyphicon glyphicon-volume-off option"></span>:
                <span className="glyphicon glyphicon-volume-up option"></span>
                }
            </div>
            </>
        );
    }
}

export default Timer;
