import React, { Component } from 'react';
import Card from '../Card';

class Hand extends Component {
    constructor(props){
        super(props);

        this.state = {
            cards: []
        }

    }

    static getDerivedStateFromProps(props, state){
        if (props.hand !== state.cards){
            state.cards = props.hand;
        }
        return state;
    }

    render(){
        return (
            <div className={"hand " + (this.props.dealer ? 'dealer' : '')}>
                {this.state.cards.map((card, index) => (
                    <Card card={card} key={index}/>
                ))}
            </div>
        );
    }
}

export default Hand;
