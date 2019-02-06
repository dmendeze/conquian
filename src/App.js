import React, { Component } from 'react';
//import {Grid, Row, Col} from 'react-bootstrap'
import RenderHand from './components/RenderHand';
import RenderDeckAndNewCard from './components/RenderDeckAndNewCard';
import './App.css';

const DEFAULT_PLAYER_COUNT = 2;
//const THREE_PLAYERS = 3;
//const FOUR_PLAYERS = 4;
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
            gameHasBegun: false,
            newCard: {}
        }

        this.generateCards = this.generateCards.bind(this);
        this.getRandomNumbers = this.getRandomNumbers.bind(this);
        this.getCardsFromDeck = this.getCardsFromDeck.bind(this);

        // onClick Handlers
        this.handleDeckClick = this.handleDeckClick.bind(this);
        this.handleNewCardClick = this.handleNewCardClick.bind(this);
    }

    // Gets random numbers corresponding to cards in deck. A way to sort of shuffle.
    getRandomNumbers(deckLength, numOfRandoms) {
        let randoms = [];
        while (randoms.length < numOfRandoms) {
            const random = Math.floor(Math.random() * (+deckLength - +0)) + +0;
            // Makes sure not to try to give same card twice.
            randoms.push(random);
        }
        return(randoms)
    }
    // Gets cards based on random numbers generated for current deal, pushes to player's cards, and removes from deck.
    getCardsFromDeck(deck, player, randoms) {
        let playerCards = this.state.playerCards;
        for (let i = 0; i < randoms.length; i++) {
            // Adds random card from deck to player's cards.
            playerCards[player].push(deck[randoms[i]]);
            // Removes card from deck.
            deck.splice(randoms[i], 1);
        }
        this.setState({
            playerCards: playerCards
        })
        return deck;
    }
    // Determines how many cards to give to each player from deck.
    dealCards(newDeck) {
        const players = this.state.players;
        let deck = newDeck;
        // Four rounds of dealing
        for (let i = 0; i < 4; i++) {
            // For each player
            for (let j = 0; j < players; j++) {
                const len = deck.length - 1;
                let randoms = [];
                switch(i) {
                    // On first deal, everyone gets 3 cards.
                    case 0:
                        randoms = this.getRandomNumbers(len, FIRST_DEAL_CARD_COUNT);
                        break;
                    // Second and third, 2 cards.
                    case 1: case 2:
                        randoms = this.getRandomNumbers(len, SECOND_AND_THIRD_DEAL_CARD_COUNT);
                        break;
                    // Fourth, 1 card.
                    default:
                        randoms = this.getRandomNumbers(len, FOURTH_DEAL_CARD_COUNT);
                }
                // New deck after dealing cards to player.
                deck = this.getCardsFromDeck(deck, j, randoms);
            }
        }

        this.setState({deck: deck})

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

    handleDeckClick(e) {
        console.log('Deck Click', e.toString())
        // 'Flips' first card when deck is clicked
        if(!this.state.gameHasBegun)
            this.setState({gameHasBegun: true})

        let deck = this.state.deck;
        const random = this.getRandomNumbers(deck.length, 1)[0];
        const newCard = deck[random];
        deck.splice(random, 1);

        this.setState({
            deck: deck,
            newCard: newCard
        })
    }
    handleNewCardClick(e) {
        console.log('New Click', e.toString())
    }

    componentWillMount() {
        this.generateCards();
    }

    render ()  {
        return (
            <div className='gameBoard'>
                <RenderHand player='mainPlayer' cards={this.state.playerCards[0]}/>
                <RenderHand player='player2' cards={this.state.playerCards[1]}/>
{/*                {THREE_PLAYERS <= this.state.players ? (
                    <RenderHand player='player3' cards={this.state.playerCards[2]}/>
                ) : (<div></div>)}
                {FOUR_PLAYERS <= this.state.players ? (
                    <RenderHand player='player4' cards={this.state.playerCards[3]}/>
                ) : (<div></div>)}
*/}
                <RenderDeckAndNewCard
                    deckLength={this.state.deck.length}
                    gameHasBegun={this.state.gameHasBegun}
                    newCard={this.state.newCard}
                    handleDeckClick={this.handleDeckClick}
                    handleNewCardClick={this.handleNewCardClick}
                />
            </div>
        );
    }

};