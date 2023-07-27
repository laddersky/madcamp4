const initialGameState = {
    "game": true,
    "characters": null,
    "action": {
      "explore":0,
      "make" : 0,
      "study": 0,
      "rest": 4,
    },
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
};

export default initialGameState;