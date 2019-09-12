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
            bet: 0,
            bankroll: 1000,
            double: 1,
            doubleEligible: true,
            splitEligible: false,
            playerAction: false,
            dealEligible: true,
            result: ''
        }
        this.shuffleDeck = this.shuffleDeck.bind(this);
        this.dealGame = this.dealGame.bind(this);
        this.dealCard = this.dealCard.bind(this);
        this.dealer = this.dealer.bind(this);
        this.stay = this.stay.bind(this);
        this.hit = this.hit.bind(this);
        this.double = this.double.bind(this);
        this.gameReset = this.gameReset.bind(this);
        this.evaluate = this.evaluate.bind(this);
        this.betChange = this.betChange.bind(this);
        this.win = this.win.bind(this);
        this.lose = this.lose.bind(this);
        this.push = this.push.bind(this);
        this.blackjackWin = this.blackjackWin.bind(this);
    }

    shuffleDeck(){
        this.setState({deck: new Deck(4)});
    }

    dealGame(){
        if (this.state.bet < 10){
            this.setState({result: "Minimum bet is 10"});
            return;
        }
        if (!this.state.deck || this.state.deck.count < 20){
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
        var dealEligible = false;

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
                this.blackjackWin();
            }
            playerAction = false;
            dealEligible = true;
        } else if (dealerValue === 21){
            result = 'Lose!';
            this.lose();
            playerAction = false;
            dealEligible = true;
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
            result,
            dealEligible
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
            },
            doubleEligible: false
        });

        if (playerValue > 21){
            this.setState({result: "Lose!"});
            this.lose();
            this.gameReset();
        }
    }

    stay(){
        this.setState({playerAction: false});
        if (this.state.player.value > 21){
            this.setState({result: "Lose!"});
            this.lose();
            this.gameReset();
        } else{
            setTimeout((scope) => { scope.dealer() }, 1000, this);
        }
    }

    double(){
        this.setState({
            double: 2,
            doubleEligible: false
        });
        this.hit();
        this.stay();
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
            this.win();
        } else{
            this.evaluate();
        }
        this.gameReset();
    }

    dealCard(player){
        var card = this.state.deck.deal(); //get next Card
        player.hand.push(card); //add card to hand
        player.value += card.value; //update value
        if (card.name === 'A'){ //check Ace
            player.ace++;
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
        var result = '';
        if (player > dealer){
            result = 'Win!';
            this.win();
        } else if (dealer > player){
            result = 'Lose!';
            this.lose();
        } else if (dealer === player){
            result = 'Tie!';
        }
        this.setState({result});
    }

    gameReset(){
        this.setState({
            playerAction: false,
            doubleEligible: true,
            dealEligible: true
        });
    }

    betChange(e){
        this.setState({bet: parseInt(e.target.value)});
    }

    win(){
        var add = this.state.bankroll + (this.state.bet * this.state.double);
        this.setState({bankroll: add})
    }
    lose(){
        this.setState({bankroll: (this.state.bankroll - (this.state.bet * this.state.double))})
    }
    push(){

    }
    blackjackWin(){
        var win = this.state.bet * 1.5;
        this.setState({bankroll: this.state.bankroll + win});
    }

    render(){
        return (
            <div className={"bj-game " + (this.state.playerAction ? 'player-turn' : '')}>
                <Hand hand={this.state.dealer.hand} dealer/>
                <Hand hand={this.state.player.hand} />
                <div className="result">
                    {this.state.result}
                </div>
                <Interface
                    deal={this.dealGame}
                    hit={this.hit}
                    stay={this.stay}
                    double={this.double}
                    gameActive={this.state.playerAction}
                    betChange={this.betChange}
                    bet={this.state.bet}
                    bankroll={this.state.bankroll}
                    doubleEligible={this.state.doubleEligible}
                    dealEligible={this.state.dealEligible}
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
