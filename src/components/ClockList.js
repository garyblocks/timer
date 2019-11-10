import React from 'react';

import { connect } from "react-redux";
import { sortable } from 'react-sortable';

import { getClocks } from "../redux/selectors";
import { sortClocks, toggleIcon } from "../redux/actions";
import Clock from './Clock';

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

const mapStateToProps = state => {
    const clock_settings = getClocks(state);
    return { clock_settings };
}

class ClockList extends React.Component {

    onSortItems = (items) => {
        const ids = items.map((clock, i) => {
            const clock_id = clock.props.clock.id;
            this.props.toggleIcon(clock_id, false);
            return clock_id;
        });
        this.props.sortClocks(ids);
    }

    render() {
        const clock_settings = this.props.clock_settings;
        var clocks = [];
        if (clock_settings && clock_settings.length) {
            clocks = clock_settings.map((setting, index) => {
                return <Clock
                        key={setting.id}
                        clock={setting}
                />
            })
        }

        // wrap for sortable
        var listItems = clocks.map((clock, i) => {
            return (
                <SortableItem
                    key={'sort_key_' + clock.props.clock.id}
                    onSortItems={this.onSortItems}
                    items={clocks}
                    sortId={i}
                >
                    {clock}
                </SortableItem>
            );
        });

        return (
            <ul className="sortable-list">
                {listItems}
            </ul>
        );
    }
}

export default connect(
    mapStateToProps,
    { sortClocks, toggleIcon }
)(ClockList);
