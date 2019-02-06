import React from 'react';

const RenderDeckAndFaceUpCard = (props) => {

    return (
        <div className='deckAndFaceUpArea'>
            {props.deckLength !== 0 ?
                (
                    <div className='deck' onClick={(e) => props.handleDeckClick(e)}>
                        <p>Deck</p>
                    </div>
                ) : (<div className='deck'></div>)
            }
            {props.gameHasBegun ?
                (
                    <div className='faceUp' onClick={(e) => props.handleNewCardClick(e)}>
                        <p>{props.faceUp.suit}</p>
                        <p>{props.faceUp.value}</p>
                    </div>
                ) : null
            }
        </div>
    )

}

export default RenderDeckAndFaceUpCard;