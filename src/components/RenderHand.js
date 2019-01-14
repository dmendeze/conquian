import React from 'react';

const RenderHand = (props) => {

    const hands = props.cards.map((card, index) => {


        return(
            <div key={index}></div>
        );
    });

    return (
        <div>
            {hands}
        </div>
    );
}

export default RenderHand;