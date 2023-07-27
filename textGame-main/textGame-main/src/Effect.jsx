import React from 'react';
import { useGameState } from './GameStateContext';

function Effect() {

    const { gameState, setGameState } = useGameState();


    return (
        <div className="">
            <h1>Consequence</h1>
            <h4>{gameState.consequence}</h4>
        </div>
    );
}


export default Effect;