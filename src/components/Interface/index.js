import React, { Component } from 'react';

class Interface extends Component {
    constructor(props){
        super(props);

        this.state = {
            gameActive: false
        }
    }

    static getDerivedStateFromProps(props, state){
        if (props.gameActive !== state.gameActive){
            state.gameActive = props.gameActive;
        }
        return state;
    }

    render(){
        return (
            <div>
                <button onClick={this.props.deal} disabled={this.state.gameActive}>Deal</button>
                <button onClick={this.props.stay} disabled={!this.state.gameActive}>Stay</button>
                <button onClick={this.props.hit} disabled={!this.state.gameActive}>Hit</button>
            </div>
        );
    }
}


export default Interface;
