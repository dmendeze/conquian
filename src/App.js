import React, { Component } from 'react';
import RenderHand from './components/RenderHand';

const DEFAULT_PLAYER_COUNT = 4;
const THREE_PLAYERS = 3;
const FOUR_PLAYERS = 4;
//const INITIAL_CARD_COUNT = 8;
//const TOTAL_CARD_COUNT = 48;
const FIRST_DEAL_CARD_COUNT = 3
const SECOND_AND_THIRD_DEAL_CARD_COUNT = 2
const FOURTH_DEAL_CARD_COUNT = 1

export default class App extends Component {

    constructor () {
        super();
        this.state = {
            players: DEFAULT_PLAYER_COUNT,
            playerCards: [
                [], [], [], []
            ],
            deck: [],
            cardsDiscarded: [],
            turn: true,
        }

        this.generateCards = this.generateCards.bind(this);
        this.getRandomNumbers = this.getRandomNumbers.bind(this);
        this.getCardsFromDeck = this.getCardsFromDeck.bind(this);
    }

    getRandomNumbers(deckLength, numOfRandoms) {
        let randoms = [];
        while (randoms.length < numOfRandoms) {
            const random = Math.floor(Math.random() * (+deckLength - +0)) + +0;
            if (!randoms.includes(random))
                randoms.push(random);
        }
        return(randoms)
    }

    getCardsFromDeck(deck, player, randoms) {
        let playerCards = this.state.playerCards;

        for (let i = 0; i < randoms.length; i++) {
            playerCards[player].push(deck[randoms[i]]);
            deck.splice(randoms[i], 1);
        }

        this.setState({
            playerCards: playerCards
        })

        return deck;
    }

    dealCards(newDeck) {

        const players = this.state.players;
        let deck = newDeck;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < players; j++) {
                const len = deck.length - 1;
                let randoms = [];

                switch(i) {
                    case 0:
                        randoms = this.getRandomNumbers(len, FIRST_DEAL_CARD_COUNT);
                        break;
                    case 1: case 2:
                        randoms = this.getRandomNumbers(len, SECOND_AND_THIRD_DEAL_CARD_COUNT);
                        break;
                    default:
                        randoms = this.getRandomNumbers(len, FOURTH_DEAL_CARD_COUNT);
                }

                deck = this.getCardsFromDeck(deck, j, randoms);
            }

        }

//        console.log('Deck after splice', deck);
//        console.log('Player hands', this.state.playerCards);

    }

    generateCards() {
        const suits = ['clubs', 'coins', 'cups', 'swords'];
        let deck = [];
        for (let i = 1; i < 13; i++) {
            for (let j = 0; j < 4; j++) {
                const newCard = {
                    suit: suits[j],
                    value: i,
//                    face: suits[j]+i.toString()
                }
                deck.push(newCard);
            }
        }
//        console.log('Full Deck when line below is commented', deck);
        this.dealCards(deck);
    };

    componentDidMount() {
        this.generateCards();
    }

    render ()  {
        return (
            <div className='gameBoard'>
                <div className='mainPlayerArea'>
                    <RenderHand cards={this.state.playerCards[0]}/>
                </div>
                <div className='player2Area'>
                </div>
                {THREE_PLAYERS <= this.state.players ? (
                    <div className='player3Area'>
                    </div>
                ) : (<div></div>)}
                {FOUR_PLAYERS <= this.state.players ? (
                    <div className='player4Area'>
                    </div>
                ) : (<div></div>)}
            </div>
        );
    }

};