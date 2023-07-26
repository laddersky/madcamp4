import React, { createContext, useState, useContext } from 'react';
import characters from './character.json'

const GameStateContext = createContext();

export function useGameState() {
  return useContext(GameStateContext);
}

export function GameStateProvider({ children }) {
  const [gameState, setGameState] = useState({
    "characters": characters,
    "action": "none",
    "water": 10,
    "food": 10,
    "medkit": 1,
    "totaldfood": 0,
    "totaldwater": 0,
    "day": 1,
    "news": "Welcome to the game!",
    "eventIndex": 0,
    "consequence": "Nothing happened.",
    "option": "none",
    "trade": null,
    "major": {
      "bs": 4,
      "cs": 1,
      "cee": 2,
      "mse": 2,
    }
  });

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameStateContext.Provider>
  );
}
