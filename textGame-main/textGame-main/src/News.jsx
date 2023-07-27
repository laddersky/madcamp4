import React from 'react';
import { useGameState } from './GameStateContext';
import Event from './Event';
import Effect from './Effect';

function News() {

    const { gameState, setGameState } = useGameState();


    return (
        <div className="News">
            <div className='text-box'>
                <h1>News</h1>
                <h3>{gameState.news}</h3>
            </div>

            <div className='text-box'><Effect/></div>
            
            <div><Event/></div>

            
        </div>
    );
}


export default News;