import React from 'react';

const RenderDeckAndCard = (props) => {

    return (
        <div className='deckAndNewCardArea'>
            {props.deckLength !== 0 ?
                (
                    <div className='deck' onClick={(e) => props.handleDeckClick(e)}>
                        <p>Deck</p>
                    </div>
                ) : (<div className='deck'></div>)
            }
            {props.gameHasBegun ?
                (
                    <div className='newCard' onClick={(e) => props.handleNewCardClick(e)}>
                        <p>{props.newCard.suit}</p>
                        <p>{props.newCard.value}</p>
                    </div>
                ) : null
            }
        </div>
    )

}

export default RenderDeckAndCard;