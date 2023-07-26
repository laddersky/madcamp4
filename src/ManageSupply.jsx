import React, { useState } from 'react';
import { useGameState } from './GameStateContext';
import events from './EventList.json';

function ManageSupply() {
  // useState 훅을 사용하여 count 상태와 setCount 함수를 정의합니다.
  // count는 현재의 상태 값이며, setCount는 상태 값을 업데이트하는 함수입니다.

    const { gameState, setGameState } = useGameState();

    const addWater = (idx) => {
      if (gameState.water > gameState.totaldwater) {
        setGameState((prevState) => ({
          ...prevState,
          characters: prevState.characters.map((character, index) =>
            index === idx ? { ...character, dwater: character.dwater + 1 } : character
          ),
          totaldwater: prevState.totaldwater + 1
        }));
      }

      console.log(gameState.characters[idx].dwater, gameState.characters[idx].dfood)
    };
    
    const addFood = (idx) => {
      if (gameState.food > gameState.totaldfood) {
        setGameState((prevState) => ({
          ...prevState,
          characters: prevState.characters.map((character, index) =>
            index === idx ? { ...character, dfood: character.dfood + 1 } : character
          ),
          totaldfood: prevState.totaldfood + 1
        }));
      }
    };
    
    const subWater = (idx) => {
      if (gameState.characters[idx].dwater > 0) {
        setGameState((prevState) => ({
          ...prevState,
          characters: prevState.characters.map((character, index) =>
            index === idx ? { ...character, dwater: character.dwater - 1 } : character
          ),
          totaldwater: prevState.totaldwater - 1
        }));
      }
    };
    
    const subFood = (idx) => {
      if (gameState.characters[idx].dfood > 0) {
        setGameState((prevState) => ({
          ...prevState,
          characters: prevState.characters.map((character, index) =>
            index === idx ? { ...character, dfood: character.dfood - 1 } : character
          ),
          totaldfood: prevState.totaldfood - 1
        }));
      }
    };

    const cure = (idx) => {

      if(gameState.characters[idx].usemed === false){
        if (gameState.medkit > 0) {
          setGameState((prevState) => ({
            ...prevState,
            characters: prevState.characters.map((character, index) =>
              index === idx ? { ...character, usemed: true } : character
            ),
            medkit: prevState.medkit - 1
          }));
        }
        else{
          window.alert("You don't have any first-aid kit.");
        }
      }
      else{
        setGameState((prevState) => ({
          ...prevState,
          characters: prevState.characters.map((character, index) =>
            index === idx ? { ...character, usemed: false } : character
          ),
          medkit: prevState.medkit + 1
        }));
      }


      
      
    };
    
    
      
      
    return (
        <div style={{justifyContent:"center"}}>
          <h1>Game: Day {gameState.day}</h1>
          <p>Currently left Water: {gameState.water} Food: {gameState.food} First-aid kit: {gameState.medkit}</p>

          <div style={{display: "flex ", justifyContent:"space-between", flexWrap:"wrap"}}>
            {
              gameState.characters.map((character, index) => (

                character.state === "dead" ?

                <div key={character.id} className="char-box gray">
                  <img src={character.image} alt={character.name} className='round-photo dead'/>
                  <h3>[Character: {character.name}]</h3>
                  <h2 style={{color: "red"}}>Status: {character.state}</h2>
                </div>


                :<div key={character.id} className="char-box">

                  
                  <img src={character.image} alt={character.name} className='round-photo'/>
                  <h3>[Character: {character.name}]</h3>
                  {
                    character.state === "sick" ?
                    <>
                      <p style={{color: "red"}}>Status: {character.state}</p>
                      <button className= {
                        character.usemed === false ? 'small green' : 'small lightgreen'
                      }
                        onClick={() => cure(index)
                        }>
                          use first-aid kit
                      </button>
                    </>
                    
                    : <p>Status: {character.state}</p>
                  }
                  <p>Majors: BS {character.major.bs} CS {character.major.cs} CEE {character.major.cee} MSE {character.major.mse}</p>
                  <p> Water: {character.water} Food: {character.food}</p>
                  <p>Give {character.dwater} water and {character.dfood} food</p>
                  <div className='button-line' style={{justifyContent:"center", alignItems: "center"}}>
                      <button className='small blue' onClick={() => addWater(index)}>+</button>
                      <p>WATER</p>
                      <button className='small red' onClick={() => subWater(index)}>-</button>
                  </div>
                  <div className='button-line' style={{justifyContent:"center", alignItems: "center"}}>
                      <button className='small blue'  onClick={() => addFood(index)}>+</button>
                      <p>FOOD</p>
                      <button className='small red' onClick={() => subFood(index)}>-</button>
                  </div>
                </div>
              ))
            }

            
            <p>Click the buttons to give water and food to the characters</p>
          </div>
            

            
        </div>
    );
}

export default ManageSupply;
