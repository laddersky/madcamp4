import React, { useState } from 'react';
import { useGameState } from './GameStateContext';
import events from './EventList.json';


function NextDayButton () {

    const relu = (num) => {if(num>0){return num} else{return 0}}

    const { gameState, setGameState } = useGameState();


    const traders = (option) => {
        if(option.name === "Yes"){
            if(gameState.water < gameState.trade.uget && gameState.trade.ures === "water"){
                setGameState((prevState) => ({
                    ...prevState,
                    consequence: "You don't have enough water to trade."
                }));
            }
            else if(gameState.food < gameState.trade.uget && gameState.trade.ures === "food"){
                setGameState((prevState) => ({
                    ...prevState,
                    consequence: "You don't have enough food to trade."
                }));
            }
            else{

                const iget = gameState.trade.iget;
                const uget = gameState.trade.uget;
                const water = gameState.trade.ires === "water" ? gameState.water + iget : gameState.water - uget;
                const food = gameState.trade.ires === "food" ? gameState.food + iget : gameState.food - uget;

                setGameState((prevState) => ({
                    ...prevState,
                    consequence: "You traded " + iget + " " + gameState.trade.ires + " for " + uget + " " + gameState.trade.ures,
                    water: water,
                    food: food,
                }));
            }
        }
    };

    const setEvent = (idx) => {
        var trade;

        if(idx === 2){
            const iget = Math.floor(Math.random() * 8) + 5;
            const uget = Math.floor(Math.random() * 8) + 5;
            const ires = Math.floor(Math.random() * 2) === 0 ? "water" : "food";
            const ures = ires === "water" ? "food" : "water";
            trade = {
                "iget": iget,
                "uget": uget,
                "ires": ires,
                "ures": ures
            }
        }
        else{
            trade = null;
        }

        setGameState((prevState) => ({
            ...prevState,
            eventIndex: idx,
            trade: trade,
        }));
    };


    const handleEvent = () => {
        if(gameState.option === "none")
            return -1;
        
        switch (gameState.eventIndex) {
            case 0:
                console.log("idle event");
                setGameState((prevState) => ({
                    ...prevState,
                    consequence: "Noting Happened"
                }));
                break;
            case 1:
                console.log("breach in!");
                setGameState((prevState) => ({
                    ...prevState,
                    consequence: "You fought off the intruders!"
                }));
                break
            case 2:
                console.log("trading...");
                traders(gameState.option);
                break;
        }

    };

    const isValid = () => {
        if(gameState.action === "none"){
            window.alert("Please choose an action before saving the state.");
            return false;
        }
        if(gameState.eventIndex === 2 && gameState.option.name === "Yes"){
            console.log(gameState.totaldwater, gameState.water, gameState.trade.uget);
            if(gameState.trade.ures === "water" && gameState.water < gameState.trade.uget
                    + gameState.totaldwater){
                window.alert("You don't have enough water to trade.");
                return false;
            }
            if(gameState.trade.ures === "food" && gameState.food < gameState.trade.uget
                    + gameState.totaldfood){
                window.alert("You don't have enough food to trade.");
                return false;
            }
        }
        if(handleEvent() === -1){
            window.alert("Please make a decision before saving the state.");
            return false;
        }
        return true;
    };

    const study = () => {
        var news = "";
        setGameState((prevState) => ({
            ...prevState,
            characters: prevState.characters.map((character, idx) => {

                console.log(character.name, character.study);

                if(character.state === "dead")
                    return character;
                if(character.study === "bs"){
                    news += character.name + " studied " + character.study + ". ";
                    return {
                        ...character,
                        major: {
                            ...character.major,
                            bs: character.major.bs + 1,
                        }
                    }
                }  
                if(character.study === "cs"){
                    news += character.name + " studied " + character.study + ". ";
                    return {
                        ...character,
                        major: {
                            ...character.major,
                            cs: character.major.cs + 1,
                        }
                    }
                }
                if(character.study === "cee"){
                    news += character.name + " studied " + character.study + ". ";
                    return {
                        ...character,
                        major: {
                            ...character.major,
                            cee: character.major.cee + 1,
                        }
                    }
                }
                if(character.study === "mse"){
                    news += character.name + " studied " + character.study + ". ";
                    return {
                        ...character,
                        major: {
                            ...character.major,
                            mse: character.major.mse + 1,
                        }
                    }
                }
                return character;
            }),
            news: "You studied." + news,
        }));
    };



    const nextDay = () => {

        var newWater = 0;
        var newFood = 0;

        var usedWaters = [0, 0, 0, 0];
        var usedFoods = [0, 0, 0, 0];
        
        if(!isValid())
            return;

        

        if(gameState.action === "explore"){

            if(gameState.characters[0].water !== 0 && gameState.characters[1].water !== 0 && gameState.characters[2].water !== 0 && gameState.characters[3].water !== 0){
                newWater = Math.floor(Math.random() * 5);
                newFood = Math.floor(Math.random() * 5);

                usedWaters = [1, 1, 1, 1];
                usedFoods = [1, 1, 1, 1];

                if(newWater === 0 && newFood === 0){
                    gameState.news = "OOPS! You got nuthin' from exploring. Try again tomorrow."
                }
                else{
                    gameState.news = "You got " + newWater + " water and " + newFood + " food from exploring."
                }
            }
            else{
                gameState.news = "You are DEHYDRATED. You got nuthin' from exploring."
            }

        }

        if(gameState.action === "study"){

            study();
        }

        if(gameState.action === "rest"){
            gameState.news = "You rested."
        }

        if(gameState.action === "make"){
            gameState.news = "You got nothing to make."
        }


        setGameState((prevState) => ({
            ...prevState,
            action: "none",
            characters: prevState.characters.map((character, idx) => {
                const usedWater = usedWaters[idx] + Math.floor(Math.random() * 2);
                const usedFood = usedFoods[idx] + Math.floor(Math.random() * 2);
                const dWater = prevState.characters[idx].dwater;
                const dFood = prevState.characters[idx].dfood;
                const water = relu(character.water + dWater - usedWater);
                const food = relu(character.food + dFood - usedFood);


                if(water === 0 || food === 0){
                    
                    return {
                        ...character,
                        state: "dead"
                    }

                }

                if(character.state === "sick"){
                    if(character.usemed === true){
                        return {
                            ...character,
                            state: "healthy",
                            usemed: false,
                            water: water,
                            food: food,
                            dwater: 0,
                            dfood: 0,
                            study: "none",
                        }
                    }

                    if(Math.random() < 0.2){
                        return {
                            ...character,
                            state: "healthy",
                            water: water,
                            food: food,
                            dwater: 0,
                            dfood: 0,
                            study: "none",
                        }
                    }

                    if(Math.random() < 0.25){
                        return {
                            ...character,
                            state: "dead"
                        }
                    }

                    else return character;
                }
            
                return {
                    ...character,
                    water: water,
                    food: food,
                    dwater: 0,
                    dfood: 0,
                    study: "none",
                };
            }),
            water: prevState.water - prevState.totaldwater + newWater,
            food: prevState.food - prevState.totaldfood + newFood,
            day: prevState.day + 1,
            totaldwater: 0,
            totaldfood: 0,
            option: "none",
          }));
          setEvent(Math.floor(Math.random() * events.length));
      };
      

    const restart = () => {
        setGameState((prevState) => ({
            characters: prevState.characters.map((character) => ({
                ...character,
                water: 10,
                food: 10,
                dwater: 0,
                dfood: 0,
              })),
              action: "none",
              water: 10,
              food: 10,
              totaldfood: 0,
              totaldwater: 0,
              day: 1,
              news: "Welcome to the game!",
              eventIndex: 0,
              option: "none",
              trade: null,
        }));
    };
    
    return (
        <div className="button-line">
            <button onClick={nextDay} className='nextday-button'>next day</button>
            <button onClick={restart} className='nextday-button'>restart(ONLY FOR DEBUGGING)</button>
        </div>
    )
}

export default NextDayButton