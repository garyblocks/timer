import React from 'react';
import ReactDOM from 'react-dom';

import Container from 'react-bootstrap/Container';

import Sound from 'react-sound';
import Helmet from "react-helmet";

import Clock from './clock';
import CreateNew from './create-new';

class Label extends React.Component {

    constructor(props) {
        super(props);
        this.state = {theme: this.props.theme};
    }

    render() {
        return (
            <>
                <Helmet>
                    <link rel="stylesheet" type="text/css" href={this.state.theme + '.css'} />
                    <link rel="stylesheet" type="text/css" href='index.css' tag={this.state.theme}/>
                </Helmet>
                <h1 className="timer_label animated fadeIn" onClick={this.props.updateKey}>Timer</h1>
            </>
        );
    }
}

class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.updateKey = this.updateKey.bind(this);
        this.state = {
            clock_count: 0,
            clock_settings: {},
            sound_status: Sound.status.STOPPED,
            key: "light"
        };
    }

    handleCreateNew(i) {
        const clock_settings = this.state.clock_settings;
        const clock_count = this.state.clock_count + 1;
        clock_settings[clock_count] = i;
        this.setState({
            clock_settings: clock_settings,
            clock_count: clock_count
        });
    }

    handleRemove(i) {
        const clock_settings = this.state.clock_settings;
        delete clock_settings[i];
        this.setState({
            clock_settings: clock_settings
        });
    }

    handleSound() {
        this.setState({
            sound_status: Sound.status.PLAYING
        })
    }

    turnOffSound() {
        this.setState({
            sound_status: Sound.status.STOPPED
        })
    }
    
    updateKey() {
        const new_key = this.state.key === "light" ? "dark" : "light";
        this.setState({key: new_key})
    }

    render() {
        const clock_settings = this.state.clock_settings;
        var clocks = [];
        for (var clock_id in clock_settings) {
            if (clock_settings.hasOwnProperty(clock_id)) {
                const setting = clock_settings[clock_id];
                clocks.push(
                    <Clock
                        key={clock_id}
                        total_mins={setting}
                        clock_id={clock_id}
                        onRemove={this.handleRemove.bind(this)}
                        playSound={this.handleSound.bind(this)}
                    />
                );
            }
        }

        return (
            <Container key={this.state.key} className="animated fadeIn">
                <Label updateKey={this.updateKey} theme={this.state.key}/>
                {clocks}
                <CreateNew onClick={(i) => this.handleCreateNew(i)} />
                <Sound
                    url="meow.mp3"
                    playStatus={this.state.sound_status}
                    volume={30}
                    onFinishedPlaying={() => this.turnOffSound()}
                />
            </Container>
        );
    }
}

ReactDOM.render(
  <Timer />,
  document.getElementById('root')
);
