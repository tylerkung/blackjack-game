import React, { Component } from 'react';

class Card extends Component {
    constructor(props){
        super(props);

        this.state = {
        }
    }
    render(){
        return (
            <div className="card">
                {this.props.card.value}
            </div>
        );
    }
}

export default Card;
