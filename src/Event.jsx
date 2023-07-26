import React from 'react';
import { useGameState } from './GameStateContext';
import events from './EventList.json';

function Event() {

    const { gameState, setGameState } = useGameState();

    console.log(gameState.eventIndex);


    return (
        <div className="Events text-box">
            <h1>Events</h1>
            <h4>{events[gameState.eventIndex].name}</h4>
            <div>{events[gameState.eventIndex].description}</div>
            <div className='button-line'>
                {
                    events[gameState.eventIndex].name === "Traders"
                    ? events[gameState.eventIndex].options.map((option, index) => {
                        const iget =gameState.trade.iget;
                        const uget =gameState.trade.uget;
                        const ires =gameState.trade.ires;
                        const ures =gameState.trade.ures;

                        return (
                        <button
                            key={index}
                            onClick={
                                () => {
                                    gameState.option=option;
                                }
                            }
                        >
                            <p>{option.name}</p>
                            <p>{option.description}</p>
                            {index === 0 && <p>I get : {iget} {ires} and They get : {uget} {ures}</p>}
                        </button>
                    );})
                    : events[gameState.eventIndex].options.map((option, index) => (
                        <button
                            key={index}
                            onClick={
                                () => {
                                    gameState.option=option;
                                }
                            }
                        >
                            <p>{option.name}</p>
                            <p>{option.description}</p>
                        </button>
                    ))
                }
            </div>
            
        </div>
    );
}


export default Event;