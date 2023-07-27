import React, { useEffect, useState } from 'react';
import { useGameState } from './GameStateContext';
import MakeGoal from './MakeGoal.jsx';

function ManageChores() {
  // useState 훅을 사용하여 count 상태와 setCount 함수를 정의합니다.
  // count는 현재의 상태 값이며, setCount는 상태 값을 업데이트하는 함수입니다.

    const actions = ["explore", "study", "rest", "make"];
    const majors = ["bs", "cs", "cee", "mse"];

    const { gameState, setGameState } = useGameState();

    const [isActionSelect, setIsActionSelect] = useState([false, false, false, false]);

    useEffect(() => {
        console.log("Action: ", gameState.action);
        setIsActionSelect((prevState) => {
            const newArr = Array(actions.length).fill(false);
            if(gameState.action === "none")
                return newArr;
            newArr[actions.indexOf(gameState.action)] = true;
            return newArr;
        }
        );
    }, []);
    

    const selectAction = (actionIndex) => {
        const newArr = Array(actions.length).fill(false);
        newArr[actionIndex] = true;
        setIsActionSelect(newArr);
        console.log("IDX: ", actionIndex, actions[actionIndex])
        setGameState((prevState) => ({
            ...prevState,
            action: actions[actionIndex],
        }));
    }

    return (
        <div>
            <div className='button-line' style={{alignSelf:"center"}}>
                {actions.map
                    ((action, index) => (
                        <button
                            key={index}
                            onClick={() => selectAction(index)}
                            disabled={isActionSelect[index]}
                            style={{margin: "0.5rem", width: "5rem"}}
                        >
                            {action}

                        </button>
                ))}
            </div>
            <div>
                {gameState.action === "explore" && <div>Explore</div>}
                {gameState.action === "study" && 
                <div>
                    <h2>Study</h2>
                    <div className='button-line' style={{alignSelf:"center"}}>
                        {gameState.characters.map
                            ((character, index) => (
                                character.state !== "dead" && 
                                <div key={index} className='char-box'>
                                    <div>
                                        {character.name}
                                        {character.study === "none" ? <div>Rest</div> : <div>Study {character.study}</div>}
                                    </div>
                                    {
                                        majors.map((major, mindex) => (
                                            <button
                                                className={
                                                    character.study === major ?
                                                    "small green" : "small lightgreen"
                                                }
                                                key={mindex}
                                                onClick={() => {
                                                    setGameState((prevState) => ({
                                                        ...prevState,
                                                        characters: prevState.characters.map((character, idx) =>
                                                            idx === index ?
                                                            { ...character, study: character.study === "none" ?
                                                                majors[mindex] : "none"}
                                                            : character
                                                        )
                                                    }));
                                                }}
                                            >
                                                {major}
                                            </button>
                                        ))
                                    }
                                </div>
                        ))}
                    </div>
                </div>}
                {gameState.action === "rest" && <div>Rest: Consumes less resources</div>}
                {gameState.action === "make" && <div><MakeGoal /></div>}
            </div>
        </div>
        
    );
}

export default ManageChores;
