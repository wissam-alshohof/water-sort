// clear cache
try {
    container = document.querySelector('#container');
    container && document.body.remove(container)
}
catch(err) {

}

const container = document.createElement('div');
container.id = "container";


document.body.appendChild(container);
makePipes(10)

function makePipes(size) {
    const colors = {[size]:[
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b",
        "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", "#ffbb78", "#98df8a",
        "#ff9896", "#c5b0d5"
    ].slice(0,size).map(c => ({color:c,volume:4}))};

    new Array(size).fill(0).forEach((i) => {
        let colorsArr = generateColors(colors[size]);
        makePipe(colorsArr);
    })
    // makePipe([])
    // makePipe([])
}
function makePipe(colors) {    
    const pipe = document.createElement('div');
    pipe.style.border="1px solid #1f1f1f";
    pipe.className ="pipe_container";
    for(let ind in colors) {
        const el = document.createElement('div');
        el.style.background = colors[ind];
        el.className ="color-section";
        // el.setAttribute('data',ind+1)
        pipe.appendChild(el);
    }  
    container.appendChild(pipe)
    return fillPipe(...colors);
    
}
function generateColors(origin) {
    const arr =[...origin];
    // console.log(c++)
    const res =[];
    const cache = new Map();
    while (res.length < 4) {
        const randIndex = getRandomIndexInRange(arr.length, cache);
        if(arr[randIndex] && arr[randIndex].volume != 0 && res.filter(c => c==arr[randIndex].color).length <2 ) {
            res.push(arr[randIndex].color)
            arr[randIndex].volume--;
        }
        if(arr[randIndex].volume == 0) {
            arr.splice(randIndex, 1)
        }
        if(!arr.length) {
            console.log({res},{randIndex})
            break;
        }
    }
    return res;
}
function getRandomIndex(size,cache) {
   const rand = Math.floor(Math.random() * size);
    cache.get(rand) ? cache.set(rand,cache.get(rand) + 1) : cache.set(rand,1);
    if(cache.get(rand) == 4) {}
}