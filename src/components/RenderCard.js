import React from 'react';

const RenderCard = (props) => {

    const id = props.suit + props.value;

    return(
        <div
            id={id}
            className={props.cName}
            onDragStart={(e) => props.onDragStart(e, id)}
        >
            {props.typeOfCard !== 'mainPlayerCard' ? (<div><br/><br/><br/><br/></div>) : null}
            <p>{props.suit}</p>
            <p>{props.value}</p>
        </div>
    )
}

export default RenderCard;