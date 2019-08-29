export default class Card{
    constructor(value = 0, suit = 'suit', name = 'name'){
        this._value = value;
        this._suit = suit;
        this._name = name;
    }
    get value() {
        return this._value;
    }
    set value(n) {
        this._value = n;
    }

    get suit() {
        return this._suit;
    }
    set suit(n) {
        this._suit = n;
    }

    get name() {
        return this._name;
    }
    set name(n) {
        this._name = n;
    }
}
