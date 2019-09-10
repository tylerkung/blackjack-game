import React, { Component } from 'react';

class Interface extends Component {
    constructor(props){
        super(props);

        this.state = {
            gameActive: false,
            doubleEligible: true
        }
    }

    static getDerivedStateFromProps(props, state){
        if (props.gameActive !== state.gameActive){
            state.gameActive = props.gameActive;
        }
        if (props.doubleEligible !== state.doubleEligible){
            state.doubleEligible = props.doubleEligible;
        }
        return state;
    }

    render(){
        return (
            <div className="bj-interface">
                <button className="btn btn-deal" onClick={this.props.deal} disabled={this.state.gameActive}>Deal</button>
                <button className="btn btn-stay" onClick={this.props.stay} disabled={!this.state.gameActive}>Stay</button>
                <button className="btn btn-hit" onClick={this.props.hit} disabled={!this.state.gameActive}>Hit</button>
                <button className="btn btn-double" onClick={this.props.double} disabled={!this.state.gameActive || !this.state.doubleEligible}>Double</button>
                <form action="" onSubmit={(e) => {
                    e.preventDefault();
                    this.props.deal();
                }}>
                    <input type="number" name="bet" value={this.props.bet} onChange={this.props.betChange} disabled={this.state.gameActive} />
                    Bankroll: ${this.props.bankroll}
                </form>
            </div>
        );
    }
}


export default Interface;
