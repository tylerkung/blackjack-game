import React, { Component } from 'react';
import Card from '../Card';

class Hand extends Component {
    constructor(props){
        super(props);

        this.state = {
            cards: []
        }

        this.renderCards = this.renderCards.bind(this);
    }

    static getDerivedStateFromProps(props, state){
        if (props.hand !== state.cards){
            state.cards = props.hand;
        }
        return state;
    }

    renderCards(){
        for (var i = 0; i < this.state.cards.length; i++){

        }
    }

    render(){
        return (
            <div className="hand">
                {this.state.cards.map((card, index) => (
                    <Card card={card} key={index}/>
                ))}
            </div>
        );
    }
}

export default Hand;
