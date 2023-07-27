import React, { useState } from 'react';
import { useGameState } from './GameStateContext';
import goals from './goal.json';
import materials from './materials.json';

function MakeGoal() {
    const { gameState, setGameState } = useGameState();

    const [isGoalSelect, setIsGoalSelect] = useState([false, false, false, false]);

    const selectGoal = (index) => {
        const newArr = Array(4).fill(false);
        newArr[index] = true;
        setIsGoalSelect(newArr);
    };




    return (
        <div style={{display: "flex"}}>

            <div className='char-box' style={{display: "flex", flexWrap: "wrap", height:"100%"}}>
                {
                    materials.map((material, index) => (
                        <img 
                            className= {
                                gameState.inventory.includes(material.name) ?
                                'thumb-photo'
                                :
                                'thumb-photo dead'
                            } 
                            src={material.src} alt={material.name} 
                        />
                    ))
                }
            </div>
            
            <div className='char-box' style={{display: "flex", flexWrap: "wrap"}}>
                {goals.map((goal, index) => (
                        <img className={
                                !isGoalSelect[index] ?
                                'round-photo dead'
                                :'round-photo'
                            }
                            src={goal.src} alt={goal.name} 
                            key={index}
                            onClick={() => selectGoal(index)}
                            disabled={isGoalSelect[index]}
                        />
                    
                ))}

                {isGoalSelect.includes(true) && <div>
                        <h2>{goals[isGoalSelect.indexOf(true)].name}</h2>
                        <h4>{goals[isGoalSelect.indexOf(true)].description}</h4>

                        <p>Required:</p>

                        <p>Major: {goals[isGoalSelect.indexOf(true)].requirement} ,{goals[isGoalSelect.indexOf(true)].stack} stacks</p>

                        <div style={{display: "flex", flexWrap: "wrap"}}>

                            {
                                goals[isGoalSelect.indexOf(true)].materials.map((material, index) => {
                                    let materialObj = materials.find(obj => obj.name === material);
                                    return(
                                    <div className='text-box' style={{width: "30%"}}>
                                        <img className={gameState.inventory.includes(materialObj.name) ?
                                            'thumb-photo'
                                            :
                                            'thumb-photo dead'}
                                        src={materialObj.src} alt={materialObj.name}
                                        style={{width: "100%"}}
                                        />
                                        <p>{materialObj.name}</p>
                                    </div>
                                );})

                            }
                        </div>
                    
                        <button
                            onClick={() => {
                                setGameState((prevState) => ({
                                    ...prevState,
                                    goal: goals[isGoalSelect.indexOf(true)],
                                }));
                            }}
                        >
                            MAKE!
                        </button>

                </div>}

            </div>
            
        </div>

    );
}

export default MakeGoal;