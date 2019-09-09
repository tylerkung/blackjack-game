import React, { Component } from 'react';

class Card extends Component {
    constructor(props){
        super(props);

        this.state = {
        }
    }


    render(){
        // console.log(this.props);
        return (
            <div className="card" data-suit={this.props.card.suit} data-name={this.props.card.name}>
                {this.props.card.name}
            </div>
        );
    }
}

export default Card;
