import React from 'react';
import RenderCard from './RenderCard';
import RenderMeldArea from './RenderMeldArea';

const RenderHand = (props) => {

    const hands = props.cards.map((card, index) => {

        const key = card.suit + card.value.toString();
        const whichPlayerCards = props.player + 'Cards';
        let typeOfCard = 'mainPlayerCard'

        if (props.player !== 'mainPlayer') {
            typeOfCard = 'otherPlayerCard';
            if (index === 0) {
                typeOfCard = typeOfCard + ' firstCard';
            } else if (index === 7) {
                typeOfCard = typeOfCard + ' lastCard';
            }
        }

        return(
            <RenderCard
                key={key}
                cName={whichPlayerCards + ' ' + typeOfCard + ' draggable '}
                suit={card.suit}
                value={card.value}
                typeOfCard={typeOfCard}
                onDragStart={props.onDragStart}
            />
        );
    });

    return (
        <div className={props.player + 'Area'}>
            <p>{props.player + 'Area'}</p>
            <div className='cardArea'>
                {hands}
            </div>
            <RenderMeldArea player={props.player} onDragOver={props.onDragOver}/>
        </div>
    );
}

export default RenderHand;