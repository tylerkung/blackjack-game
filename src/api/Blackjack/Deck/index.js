import Card from '../Card';

export default class Deck{
    constructor(num = 1){
        if (num < 1){
            throw Error('Deck amount must be at least 1');
        }
        this._deck = [];
        this._count = 0;

        const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
        const values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
        const names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        for (var i = 0; i < num; i++){
            for (var j = 0; j < suits.length; j++){
                for (var k = 0; k < values.length; k++){
                    this._deck.push(new Card(values[k], suits[j], names[k]));
                    this._count++;
                }
            }
        }
        this.shuffle();
    }

    get deck() {
        return this._deck;
    }
    set deck(n) {
        this._value = n;
    }

    deal() {
        this._count--;
        return this._deck.pop();
    }

    shuffle() {
        for (let i = this._deck.length-1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            [this._deck[i], this._deck[j]] = [this._deck[j], this._deck[i]];
        }
    }

}
