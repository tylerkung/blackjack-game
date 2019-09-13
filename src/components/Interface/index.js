import React, { Component } from 'react';

class Interface extends Component {
    constructor(props){
        super(props);

        this.state = {
            gameActive: false,
            doubleEligible: true,
            dealEligible: true
        }
    }

    static getDerivedStateFromProps(props, state){
        if (props.gameActive !== state.gameActive){
            state.gameActive = props.gameActive;
        }
        if (props.doubleEligible !== state.doubleEligible){
            state.doubleEligible = props.doubleEligible;
        }
        if (props.dealEligible !== state.dealEligible){
            state.dealEligible = props.dealEligible;
        }
        return state;
    }

    render(){
        return (
            <div className="bj-interface">
                <div className="bj-wager">
                <form action="" onSubmit={(e) => {
                    e.preventDefault();
                    this.props.deal();
                }}>
                    <input type="number" name="bet" value={this.props.bet} onChange={this.props.betChange} disabled={this.state.gameActive} />
                </form>
                </div>
                <div className="bj-buttons">
                    <div className="bj-bankroll">
                        ${this.props.bankroll}
                    </div>
                    <button className="btn btn-deal" onClick={this.props.deal} disabled={!this.state.dealEligible}>Deal</button>
                    <button className="btn btn-stay" onClick={this.props.stay} disabled={!this.state.gameActive}>Stay</button>
                    <button className="btn btn-hit" onClick={this.props.hit} disabled={!this.state.gameActive}>Hit</button>
                    <button className="btn btn-double" onClick={this.props.double} disabled={!this.state.gameActive || !this.state.doubleEligible}>Double</button>
                </div>
            </div>
        );
    }
}


export default Interface;
