import React from 'react';
import ReactDOM from 'react-dom';

import Container from 'react-bootstrap/Container';

import Clock from './clock';
import Label from './label';
import CreateNew from './create-new';

class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.updateKey = this.updateKey.bind(this);
        this.state = {
            clock_count: 0,
            clock_settings: {},
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
                    />
                );
            }
        }

        return (
            <Container key={this.state.key} className="animated fadeIn">
                <Label updateKey={this.updateKey} theme={this.state.key}/>
                {clocks}
                <CreateNew onClick={(i) => this.handleCreateNew(i)} />
            </Container>
        );
    }
}

ReactDOM.render(
  <Timer />,
  document.getElementById('root')
);
