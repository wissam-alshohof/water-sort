function fillPipe(...params) {
    const p = [];
    for(let param of params) {
        if(param && params.length <= 4)  p.push(param);
    }
    return new Pipe(p);
}



class Pipe {
    #volume = 0;
    #colors = [];
    //first element if pipe is empty;
    //second element array of colors and volumes
    //third element if pipe is full with one color
    pipe = [true,[], false];
    constructor(colors){
        if(colors && colors.length) {
            this.#colors = colors;
            this.#volume = colors.length;
            this.buildPipe();
        } else {
            this.pipe = [true,[],false]
        } 
    }
    buildPipe() {
        this.pipe[0] = false;
        this.pipe[1][0] = {color:this.#colors[0],volume:1};       
        
        if(this.#volume == 1) {
            this.pipe[2] = false;
        } 
        let right = 1;
        let left = right - 1;
            while (right < this.#volume){
                if(this.#colors[right] == this.#colors[left]) {
                    this.pipe[1][left] = {color:this.#colors[left],volume: this.pipe[1][left]?.volume ? this.pipe[1][left]?.volume + 1 :1};
                    right++;
                }
                else {
                    this.pipe[1][left] = {color:this.#colors[left],volume:this.pipe[1][left]?.volume || 1};
                    this.pipe[1][right] = {color:this.#colors[right],volume:1};
                    left = right;
                    right++;
                }
            }
        if(this.#volume == 4) {
            this.pipe[2] = true;
        }
        
    }
    static isPicked = false;
    static pickedColor = {};
    pickColor() {
        if(Pipe.isPicked = !Pipe.isPicked) {
            Pipe.pickedColor = this.pipe[1].pop();
        } else {
            this.pipe[1].push({...Pipe.pickedColor});
            Pipe.pickColor ={};
        }
        
    }
    spoilColor() {
        if(Pipe.isPicked) return;
    }
}



