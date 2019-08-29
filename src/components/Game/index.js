import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../../api/Blackjack/Card';
import Deck from '../../api/Blackjack/Deck';

class Game extends Component {
    constructor(props){
        super(props);

        this.state = {
            deck: undefined,
            players: {
                playerOne: {
                    active: true,
                    hand: [],
                    value: 0
                },
                playerTwo: {
                    active: false,
                    hand: [],
                    value: 0
                },
                playerThree: {
                    active: false,
                    hand: [],
                    value: 0
                },
                dealer: {
                    active: true,
                    hand: [],
                    value: 0
                }
            }
        }
        this.dealGame = this.dealGame.bind(this);
        this.dealCard = this.dealCard.bind(this);
    }

    dealGame(){
        for (var i = 0; i < 2; i++){
            for (var player in this.state.players){
                let currentPlayer = this.state.players[player];
                if (this.state.players[player].active){
                    this.dealCard(player);
                }
            }
        }
    }

    dealCard(playerHand){
        this.setState((state) => {
            state.players[playerHand].value++
            return state;
        })
    }

    render(){
        const deck = new Deck(3);
        return (
            <div>
            
                <button onClick={this.dealGame}>Deal</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

export default connect(mapStateToProps)(Game);
