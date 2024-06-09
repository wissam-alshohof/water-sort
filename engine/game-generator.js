const State = require('./state');
const _ = require('lodash');

const COLORS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

function GameGenerator(numberOfColor, numberOfEmptyBottles, bottleSize) {
    const generateBottles = () => {
        const allColors = [];
        for(let i = 0; i < numberOfColor; i++) {
            allColors.push(...(new Array(this.bottleSize).fill(COLORS[i])));
        }
        return [
            ..._.chunk(_.shuffle(allColors), this.bottleSize),
            ...(new Array(this.numberOfEmptyBottles).fill([]))
        ];
    }

    this.bottleSize = bottleSize;
    this.numberOfBottles = numberOfColor;
    this.numberOfColor = numberOfColor;
    this.numberOfEmptyBottles = numberOfEmptyBottles;
    this.currentState = new State(generateBottles(), this.numberOfColor);

    
    return this;
}

module.exports = GameGenerator;