import React, { Component } from 'react';
//import {Grid, Row, Col} from 'react-bootstrap'
import RenderHand from './components/RenderHand';
import RenderDeckAndFaceUpCard from './components/RenderDeckAndFaceUpCard';
import './App.css';

const DEFAULT_PLAYER_COUNT = 2;
//const THREE_PLAYERS = 3;
//const FOUR_PLAYERS = 4;
//const INITIAL_CARD_COUNT = 8;
//const TOTAL_CARD_COUNT = 48;
const FIRST_DEAL_CARD_COUNT = 3
const SECOND_AND_THIRD_DEAL_CARD_COUNT = 2
const FOURTH_DEAL_CARD_COUNT = 1

// TODO: WHEN DEALING CARDS, SORT BY VALUE.
// TODO: ALLOW PLAYER TO MOVE CARDS AROUND.
// TODO: WHEN MAKING MELDS, PROVIDE 3 AREAS FOR MELDS TO BE MADE
    // TODO: CARDS IN MELDS MUST BE SORTED BY VALUE IF NOT THE SAME
    // TODO: MUST CHECK IF SUITS ARE SAME IF MAKING A RUN

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
            faceUp: {}
        }

        this.generateCards = this.generateCards.bind(this);
        this.getRandomNumbers = this.getRandomNumbers.bind(this);
        this.getCardsFromDeck = this.getCardsFromDeck.bind(this);

        // onClick Handlers
        this.handleDeckClick = this.handleDeckClick.bind(this);
        this.handleNewCardClick = this.handleNewCardClick.bind(this);
        // Dragging
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
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
    // Creates deck of cards
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
    }
    // When deck is clicked, turn new card over, and remove faceUp card from deck
    handleDeckClick(e) {
        console.log('Deck Click', e.toString())
        // 'Flips' first card when deck is clicked
        if(!this.state.gameHasBegun)
            this.setState({gameHasBegun: true})
        // Gets random number, gets new Card, and removes card from deck.
        let deck = this.state.deck;
        const random = this.getRandomNumbers(deck.length, 1)[0];
        const faceUp = deck[random];
        deck.splice(random, 1);
        this.setState({
            deck: deck,
            faceUp: faceUp
        })
    }
    //
    handleNewCardClick(e) {
        console.log('New Click', e.toString())
    }
    // Begins dragging of object
    onDragStart(e, id) {
        e.dataTransfer.setData('id', id);
    }
    // Ends dragging of object
    onDragOver(e) {
        e.preventDefault();
    }

    componentWillMount() {
        this.generateCards();
    }

    render ()  {
        return (
            <div className='gameBoard'>
                <RenderHand
                    player='mainPlayer'
                    cards={this.state.playerCards[0]}

                    onDragOver={this.onDragOver}
                    onDragStart={this.onDragStart}
                />
                <RenderHand
                    player='player2'
                    cards={this.state.playerCards[1]}

                    onDragOver={this.onDragOver}
                    onDragStart={this.onDragStart}
                />
{/*                {THREE_PLAYERS <= this.state.players ? (
                    <RenderHand player='player3' cards={this.state.playerCards[2]}/>
                ) : (<div></div>)}
                {FOUR_PLAYERS <= this.state.players ? (
                    <RenderHand player='player4' cards={this.state.playerCards[3]}/>
                ) : (<div></div>)}
*/}
                <RenderDeckAndFaceUpCard
                    deckLength={this.state.deck.length}
                    gameHasBegun={this.state.gameHasBegun}
                    faceUp={this.state.faceUp}
                    handleDeckClick={this.handleDeckClick}
                    handleNewCardClick={this.handleNewCardClick}
                />
            </div>
        );
    }

};