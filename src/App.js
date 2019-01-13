/* eslint max-len: 0 */
/* eslint no-alert: 0 */
/* eslint guard-for-in: 0 */
/* eslint no-unused-vars: 0 */
import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class App extends Component {

    constructor () {
        super();
        this.state = {
            cardsInHand: [],
            cardsInAI: [],
            deck: [],
            cardsDiscarded: [],
            turn: true,
        }

        this.generateCards = this.generateCards.bind(this);

    }

    componentDidMount() {
        this.generateCards();
    }

    generateCards() {

        const suits = ['clubs', 'coins', 'cups', 'swords'];
        const deck = [];

        for (let i = 1; i < 13; i++) {
            for (let j = 0; j < 4; j++) {
                const newCard = {
                    suit: suits[j],
                    value: i,
                    face: suits[j]+i.toString()
                }
                deck.push(newCard);
            }
        }

        this.setState({deck: deck});

    };

    render ()  {
        return (
            <div>
                {this.state.deck.map((card, index) => (
                    <p key={index}>{card.value} of {card.suit}</p>
                ))}
            </div>
        );
    }

};