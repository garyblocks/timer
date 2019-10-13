import React from 'react';
import ReactDOM from 'react-dom';

import Container from 'react-bootstrap/Container';
import {sortable} from 'react-sortable';

import Clock from './clock';
import Label from './label';
import CreateNew from './create-new';

class Item extends React.Component {
    render() {
        return (
            <li {...this.props}>
                {this.props.children}
            </li>
        )
    }
}

var SortableItem = sortable(Item);

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
        clock_settings["Clock " + clock_count] = i;
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

    onSortItems = (items) => {
        const clock_settings = {};
        items.map((clock, i) => {
            clock_settings[clock.props.clock_id] = clock.props.total_mins;
            return i;
        });
        this.setState({
            clock_settings: clock_settings
        });
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

        // wrap for sortable
        var listItems = clocks.map((clock, i) => {
            return (
                <SortableItem
                    key={i}
                    onSortItems={this.onSortItems}
                    items={clocks}
                    sortId={i}
                >
                    {clock}
                </SortableItem>
            );
        });

        return (
            <Container key={this.state.key} className="animated fadeIn">
                <Label updateKey={this.updateKey} theme={this.state.key}/>
                <ul className="sortable-list">
                    {listItems}
                </ul>
                <CreateNew onClick={(i) => this.handleCreateNew(i)} />
            </Container>
        );
    }
}

ReactDOM.render(
  <Timer />,
  document.getElementById('root')
);
