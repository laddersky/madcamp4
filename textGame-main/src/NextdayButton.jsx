import React, { useState, useEffect } from 'react';
import { useGameState } from './GameStateContext';
import events from './EventList.json';
import characters from './character.json';
import initialGameState from './initialGame.js';
import goals from './goal.json';


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
        let news = "";

        for(var i = 0; i < gameState.characters.length; i++) {
            if(gameState.characters[i].state === "dead")
                continue;
            if(gameState.characters[i].study === "none")
                continue;
            else{
                news += gameState.characters[i].name + " studied " + gameState.characters[i].study + ". ";
            }
        }



        setGameState((prevState) => ({
            ...prevState,
            characters: prevState.characters.map((character, idx) => {

                if(character.state === "dead")
                    return character;
                if(character.study === "bs"){
                    
                    return {
                        ...character,
                        major: {
                            ...character.major,
                            bs: character.major.bs + 1,
                        }
                    }
                }  
                if(character.study === "cs"){
                    return {
                        ...character,
                        major: {
                            ...character.major,
                            cs: character.major.cs + 1,
                        }
                    }
                }
                if(character.study === "ae"){
                    return {
                        ...character,
                        major: {
                            ...character.major,
                            ae: character.major.ae + 1,
                        }
                    }
                }
                if(character.study === "mse"){
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
        }));

        console.log(news);


        return "You studied." + news;
    };

    const canMake = () => {

        if(gameState.characters[0].major[gameState.goal.requirement] < gameState.goal.stack)
            return false;
        for(var i = 0; i < gameState.goal.materials.length; i++){
            if(!gameState.inventory.includes(gameState.goal.materials[i]))
                return false;
        }
        return true;
    }

    const nextDay = () => {

        var newWater = 0;
        var newFood = 0;
        let news = "";
        let game = "playing";

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
                    news = "OOPS! You got nuthin' from exploring. Try again tomorrow."
                }
                else{
                    news = "You got " + newWater + " water and " + newFood + " food from exploring."
                }
            }
            else{
                news = "You are DEHYDRATED. You got nuthin' from exploring."
            }

        }

        if(gameState.action === "study"){

            news = study();
        }

        if(gameState.action === "rest"){
            news = "You rested."
        }

        if(gameState.action === "make"){
            if(gameState.goal !== null){
                if(canMake()){
                    news = "You made " + gameState.goal.name + ".";
                    game = "victory";
                }else{
                    news = "You don't have enough materials to make " + gameState.goal.name + ".";
                }
            }
            else
            {news = "You got nothing to make."}
        }


        setGameState((prevState) => ({
            ...prevState,
            action: "none",
            characters: prevState.characters.map((character, idx) => {
                const usedWater = usedWaters[idx] + Math.floor(Math.random() * 3) + (character.state === "sick" ? 1 : 0);
                const usedFood = usedFoods[idx] + Math.floor(Math.random() * 3) + (character.state === "sick" ? 1 : 0);
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

                if(character.state === "healthy" && water < 4 && food < 4){
                    if(Math.random() < 0.3){
                        return {
                            ...character,
                            state: "sick",
                            water: water,
                            food: food,
                            dwater: 0,
                            dfood: 0,
                            study: "none",
                        }
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

                    else return {
                        ...character,
                        state: "sick",
                        water: water,
                        food: food,
                        dwater: 0,
                        dfood: 0,
                        study: "none",
                    };
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
            news: news,
            goal: null,
            game: game,
        }));
        setEvent(Math.floor(Math.random() * events.length));
        
    };

    useEffect(() => {
        const allCharactersDead = gameState.characters.every(
        (character) => character.state === "dead"
        );
    
        if (allCharactersDead) {
            setGameState((prevState) => ({
                ...prevState,
                news: "GAME OVER! All characters are dead.",
            }));
            window.alert("GAME OVER! All characters are dead.");
        }
    }, [gameState.characters]);

    useEffect(() => {
        if(gameState.game === "victory"){
            setGameState((prevState) => ({
                ...prevState,
                news: "You won the game!",
                }));
            window.alert("You won the game!");
        }
    }, [gameState.game]);

      

    const restart = () => {
        setGameState({
            ...initialGameState,
            characters: characters,
        });
    };
    
    return (
        <div className="button-line">
            <button onClick={nextDay} className='nextday-button'>next day</button>
            <button onClick={restart} className='nextday-button'>restart(ONLY FOR DEBUGGING)</button>
        </div>
    )
}

export default NextDayButton