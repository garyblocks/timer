import React from 'react';

import Helmet from "react-helmet";

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

export default Label;
