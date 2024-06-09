function fillPipe(id,...params) {
    const p = [];
    for(let param of params) {
        if(param && params.length <= 4)  p.push(param);
    }
    return new Pipe(id,p);
}



class Pipe {
    #volume = 0;
    #colors = [];
    id = NaN;
    //first element if pipe is empty;
    //second element array of colors and volumes
    //third element if pipe is full with one color
    pipe = [true,[], false];
    constructor(id,colors){
        this.id = id;
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
    isPicked = false;
    pickedColor = {};
    pickColor(id) {

        if(this.isPicked = !this.isPicked && !id) {
            this.pickedColor = this.pipe[1].pop();
        } else {
            this.pipe[1].push({...this.pickedColor});
            this.pickedColor ={};
        }
        return this.pickedColor;
    }
    /**
     * 
     * @param {{color:string,volume:number}} color 
     * @returns 
     */
    spoilColor(color) {
        if(this.isPicked) return;
        (color.pickedColor.color == this.pipe[1][this.#volume-1] && this.volume != 4) || this.pipe[0] ?
        console.log({color}) : color.id == this.id ? this.pickColor(color.id) : alert("You idiot this is not allowed")
        
    }
}



