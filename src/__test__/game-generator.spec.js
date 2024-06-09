const GameGenerator = require("../engine/game-generator");
const _ = require('lodash');


const countColor = (bottles) => {
    return _.uniq(_.flatten(bottles)).length;
}

const countEmpty = (bottles) => {
    return bottles.filter(el => el.length === 0).length;
}

describe("test Game Generator", () => {
    it.each`
        numberOfColor   |   numberOfEmpty   |   bottleSize 
            ${2}        |       ${0}        |       ${2}  
            ${4}        |       ${1}        |       ${2}    
            ${4}        |       ${1}        |       ${4}    

    `("should create a game with numberOfColor $numberOfColor, numberOfEmpty $numberOfEmpty and bottleSize $bottleSize",
        ({numberOfColor, numberOfEmpty, bottleSize}) => {
            const game = new GameGenerator(numberOfColor, numberOfEmpty, bottleSize);
            console.log(game.currentState.bottles)
            expect(game.currentState).toBeTruthy();
            expect(game.currentState.bottles.length).toBe(numberOfColor + numberOfEmpty);
            expect(countColor(game.currentState.bottles)).toBe(numberOfColor);
            expect(countEmpty(game.currentState.bottles)).toBe((numberOfEmpty));
            // expect(game.currentState.isWinning()).toBe(false);
        })
});