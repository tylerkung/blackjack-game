import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../../api/Blackjack/Card';

class Hand extends Component {
    constructor(props){
        super(props);

        this.state = {
        }
    }
    componentDidUpdate(){
        console.log('update');
    }
    render(){
        return (
            <div>
                Hand: {this.props.player.value}<button onClick={() => { console.log(this.props) }}>Props</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

export default connect(mapStateToProps)(Hand);
