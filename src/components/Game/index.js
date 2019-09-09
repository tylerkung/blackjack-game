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
        var playerAce = 0;
        var dealerAce = 0;
        var i = 0;
        var playerAction = true;
        var result = '';

        while (i < 2){
            var playerCard = this.state.deck.deal();
            var dealerCard = this.state.deck.deal();
            if (playerCard.name === 'A'){
                playerAce++;
            }
            if (dealerCard.name === 'A'){
                dealerAce++;
            }
            playerHand.push(playerCard);
            dealerHand.push(dealerCard);
            playerValue += playerCard.value;
            dealerValue += dealerCard.value;
            i++;
        }

        if (playerValue === 21){
            if (dealerValue === 21){
                result = 'Push!';
            } else{
                result = 'Blackjack!';
            }
            playerAction = false;
        } else if (dealerValue === 21){
            result = 'Lose!';
            playerAction = false;
        }


        this.setState({
            player: {
                hand: playerHand,
                value: playerValue,
                ace: playerAce
            },
            dealer: {
                hand: dealerHand,
                value: dealerValue,
                ace: dealerAce
            },
            playerAction,
            result
        })
    }

    hit(){
        var playerHand = this.state.player;
        playerHand = this.dealCard(playerHand);

        var playerAces = playerHand.ace;
        var playerValue = playerHand.value;
        if (playerValue > 21 && playerAces > 0){
            playerValue -= 10;
            playerAces--;
        }

        this.setState({
            player: {
                hand: playerHand.hand,
                value: playerValue,
                ace: playerAces
            }
        });

        if (playerValue > 21){
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
        var dealerAces = dealerHand.ace;
        var dealerValue = dealerHand.value;

        while (dealerValue < 17 || dealerAces === 2){ // hit if less than 17, or if pocket aces
            dealerHand = this.dealCard(dealerHand);
            dealerAces = dealerHand.ace;
            dealerValue = dealerHand.value;
            if (dealerValue > 21 && dealerAces > 0){
                dealerValue -= 10;
                dealerAces--;
            }
        }
        this.setState({
            dealer: {
                hand: dealerHand.hand,
                value: dealerValue,
                aces: dealerAces
            }
        });

        if (dealerHand.value > 21){
            this.setState({result: "Win!"});
            this.gameReset();
        } else{
            this.evaluate();
            this.gameReset();
        }
    }

    dealCard(player){
        var card = this.state.deck.deal(); //get next Card
        player.hand.push(card); //add card to hand
        player.value += card.value; //update value
        if (card.name === 'A'){ //check Ace
            player.ace++;
            console.log(player.ace);
        }
        if (player.value > 21 && player.ace > 0){ //validate 11 or 1 ace
            player.value -= 10;
            player.ace--;
        }
        return player; //return hand, value, ace count
    }

    evaluate(){ //if not bust
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
            <div className={(this.state.playerAction ? 'player-turn' : '')}>
                <Hand hand={this.state.dealer.hand} dealer/>
                <Hand hand={this.state.player.hand} />
                {this.state.result}
                <Interface
                    deal={this.dealGame}
                    hit={this.hit}
                    stay={this.stay}
                    gameActive={this.state.playerAction}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

export default connect(mapStateToProps)(Game);
