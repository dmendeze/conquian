import React from 'react';

const RenderCard = (props) => {
    return(
        <div
            className={props.cName}
        >
            {props.typeOfCard !== 'mainPlayerCard' ? (<div><br/><br/><br/><br/></div>) : null}
            <p>{props.suit}</p>
            <p>{props.value}</p>
        </div>
    )
}

export default RenderCard;