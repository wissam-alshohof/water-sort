const _ = require("lodash");

class State {
    parent = null;
    bottleSize = 4;
    constructor(bottles, numberOfColor) {
        this.bottles = _.cloneDeep(bottles);
        this.numberOfColor = numberOfColor;
    }
    
    __evaluation() {
        return this.bottles.reduce((prev, curr) => {
            return prev + _.uniq(curr).length;
        }, 0)
    }

    isWinning() {
        return this.__evaluation() === this.numberOfColor;
    } 

    __isFull(index) {
        return this.bottleSize === this.bottles[index].length;
    }

    __isEmpty(index) {
        return this.bottles[index].length === 0;
    }

    __pop(index, size) {
        const bottle = [...this.bottles[index]];
        const topColor = bottle[bottle.length - 1];
        const result = [];
        for(let i = bottle.length - 1; i >= 0; i--) {
            if(result.length === size) {
                break;
            }
            if(bottle[i] === topColor) {
                result.push(bottle[i]);
            } else {
                break;
            }
        }
        return result;
    }

    __checkValidty(base, target) {
        if (this.__isEmpty(base) || this.__isFull(target)) {
            return false
        }
        if(!this.__isEmpty(target)) {
            const topBase = this.bottles[base][this.bottles[base].length - 1];
            const topTarget = this.bottles[target][this.bottles[target].length - 1];
            if(topBase !== topTarget) {
                return false;
            }
        }
        return true;
    }

    pour(base, target) {
        if (!this.__checkValidty(base, target)) {
            return {
                done: false,
                state: null
            };
        }
        const result = this.__pop(base, this.bottleSize - this.bottles[target].length);
        const newSate = new State(this.bottles, this.numberOfColor);
        newSate.parent = this;
        newSate.bottles[target].push(...result);
        newSate.bottles[base].splice(-result.length);
        // console.log(result.length)
        // console.log(this);
        // console.log(newSate);
        return {
            done: true,
            state: newSate
        }
    }
}

module.exports = State;