import React from 'react';

export const MeldArea = (props) => {
    return(
        <div
            className={props.player + 'Meld' + props.meld + ' droppable'}
            onDragOver={(e) => props.onDragOver(e)}
        >

        </div>
    );
}

const RenderMeldArea = (props) => {

    return(
        <div className={props.player + 'MeldArea'}>
            <MeldArea player={props.player} meld={1}/>
            <MeldArea player={props.player} meld={2}/>
            <MeldArea player={props.player} meld={3}/>
        </div>
    );

}

export default RenderMeldArea;