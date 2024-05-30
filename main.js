// clear cache
try {
    container = document.querySelector('#container');
    container && document.body.remove(container)
}
catch(err) {

}

const container = document.createElement('div');
container.id = "container"
container.style.width= "100vw";
container.style.height= "100vh";
container.style.background= "#b1b1b1";
container.style.display = "flex"


document.body.appendChild(container);
makePipes(10)

function makePipes(size) {
    const colors = {[size]:[
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b",
        "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", "#ffbb78", "#98df8a",
        "#ff9896", "#c5b0d5"
    ].slice(0,size-2).map(c => ({color:c,volume:4}))};
    console.log(colors[size])
    for(let i of colors[size]) {
        const colorsArr = generateColors(colors[size]);
        console.log(colorsArr)
        makePipe(colorsArr);
    }
    // makePipe([])
    // makePipe([])
}
function makePipe(colors) {    
    const pipe = document.createElement('div');
    pipe.style.border="1px solid #1f1f1f";
    pipe.style.paddingTop="10px";
    pipe.style.display="flex";
    pipe.style.flexDirection="column";
    pipe.style.borderRadius = '15px';
    pipe.style.width = "30px";
    pipe.style.flexGrow = "0";
    const el1 = document.createElement('div');
    el1.style.background = colors[0]
    el1.style.height = "40px"
    el1.style.flexGrow = "0"
    el1.style.borderBottomLeftRadius = '15px';
    el1.style.borderBottomRightRadius = '15px';
    const el2 = document.createElement('div');
    el2.style.background = colors[1]
    el2.style.height = "40px"
    el2.style.flexGrow = "0"
    const el3 = document.createElement('div');
    el3.style.background = colors[2]
    el3.style.height = "40px"
    el3.style.flexGrow = "0"
    const el4 = document.createElement('div');
    el4.style.background = colors[3]
    el4.style.height = "40px"
    el4.style.flexGrow = "0"
    pipe.appendChild(el4)
    pipe.appendChild(el3)
    pipe.appendChild(el2)
    pipe.appendChild(el1)
    container.appendChild(pipe)
    return fillPipe(...colors);
    
}

function generateColors(arr) {
    vol = 0;
    res =[];
    while (vol < 4) {
        const randIndex = Math.floor(Math.random() * arr.length);
        if(arr[randIndex] && arr[randIndex].volume != 0 && res.filter(c => c==arr[randIndex].color).length <2 ) {
            res.push(arr[randIndex].color)
            arr[randIndex].volume--;
            vol++;
        }
    }
    return res;
}
