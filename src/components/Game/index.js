import React, { Component } from 'react';
import { connect } from 'react-redux';
import Deck from '../../api/Blackjack/Deck';

import Hand from '../Hand';
import Interface from '../Interface';

class Game extends Component {
    constructor(props){
        super(props);

        this.state = {
            deck: new Deck(4),
            player: {
                hand: [],
                value: 0,
                bet: 0,
                win: false
            },
            dealer: {
                hand: [],
                value: 0,
                win: false
            },
            playerAction: false,
            result: ''
        }
        this.shuffleDeck = this.shuffleDeck.bind(this);
        this.dealGame = this.dealGame.bind(this);
        this.dealCard = this.dealCard.bind(this);
        this.dealer = this.dealer.bind(this);
        this.stay = this.stay.bind(this);
        this.hit = this.hit.bind(this);
        this.gameReset = this.gameReset.bind(this);
        this.evaluate = this.evaluate.bind(this);
    }

    shuffleDeck(){
        this.setState({deck: new Deck(4)});
    }

    dealGame(){
        if (!this.state.deck){
            this.shuffleDeck();
        }
        var playerHand = [];
        var dealerHand = [];
        var playerValue = 0;
        var dealerValue = 0;
        var i = 0;
        while (i < 2){
            var playerCard = this.state.deck.deal();
            var dealerCard = this.state.deck.deal();
            console.log(playerCard, dealerCard);
            playerHand.push(playerCard);
            dealerHand.push(dealerCard);
            playerValue += playerCard.value;
            dealerValue += dealerCard.value;
            i++;
        }
        this.setState({
            player: {
                hand: playerHand,
                value: playerValue
            },
            dealer: {
                hand: dealerHand,
                value: dealerValue
            },
            playerAction: true,
            result: ''
        })
    }

    hit(){
        var playerHand = this.state.player;
        playerHand = this.dealCard(playerHand);
        this.setState({
            player: {
                hand: playerHand.hand,
                value: playerHand.value
            }
        });
        if (playerHand.value > 21){
            this.setState({result: "Lose!"});
            this.gameReset();
        }
    }

    stay(){
        this.setState({playerAction: false});
        this.dealer();
    }

    dealer(){
        var dealerHand = this.state.dealer;
        while (dealerHand.value < 17){
            dealerHand = this.dealCard(dealerHand);
        }
        this.setState({
            dealer: {
                hand: dealerHand.hand,
                value: dealerHand.value
            }
        });
        if (dealerHand.value > 21){
            this.setState({result: "Win!"});
            this.gameReset();
        } else{
            this.evaluate();
        }
    }

    dealCard(player){
        var card = this.state.deck.deal();
        player.hand.push(card);
        player.value += card.value;
        return player;
    }

    evaluate(){
        var player = this.state.player.value;
        var dealer = this.state.dealer.value;
        if (player > dealer){
            this.setState({result: "Win!"});
        } else if (dealer > player){
            this.setState({result: "Lose!"});
        } else if (dealer === player){
            this.setState({result: "Tie!"});
        }
    }

    gameReset(){
        this.setState({
            playerAction: false
        });
    }

    render(){
        return (
            <div>
                <Hand hand={this.state.dealer.hand} dealer/>
                <Hand hand={this.state.player.hand} />

                <div>Dealer: {this.state.dealer.value}</div>
                <div>Player: {this.state.player.value}</div>
                {this.state.result}
                <Interface
                    deal={this.dealGame}
                    hit={this.hit}
                    stay={this.stay}
                    gameActive={this.state.playerAction}
                />

                <button onClick={() => {console.log(this.state)}}>View Deck</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

export default connect(mapStateToProps)(Game);
