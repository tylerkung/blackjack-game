import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../../api/Blackjack/Card';

class Game extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const aceOfSpades = new Card(1, 'spades', 'Ace');
        return (
            <div>
                Game
                {aceOfSpades.value}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

export default connect(mapStateToProps)(Game);
