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
    pipes = [];
    const colors = {[size]:[
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b",
        "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", "#ffbb78", "#98df8a",
        "#ff9896", "#c5b0d5"
    ].slice(0,size).map(c => ({color:c,volume:4}))};
    for (let i in Array(size).fill(0)) {
        colorsArr = generateColors( colors[size]);
        pipes.push(makePipe(colorsArr,i));
    }
    pipes.push(makePipe([],size));
    pipes.push(makePipe([],size+1));
    let pickedColorPipe = {};
    const pipesContainers = document.querySelectorAll('div.pipe_container');
    container.addEventListener('click',e => {
        pipesContainers.forEach(p => p.classList.remove('selected'))
    })
    pipesContainers.forEach(
        pipe => pipe.addEventListener('click',e => {
            e.stopPropagation()
            pipe.classList.toggle('selected');
            let clickedPipe = pipes.find(p => pipe.id == "pipe_"+p.id);
            if(pickedColorPipe.pickedColor) {
                clickedPipe.spoilColor(pickedColorPipe);
                document.getElementById(pickedColorPipe.id).classList.remove('selected');
                pickedColorPipe = {}
                return;
            }
            pickedColorPipe = {pickedColor:clickedPipe.pickColor(pickedColorPipe.id),id:"pipe_"+clickedPipe.id};
        })
    )
}
function makePipe(colors,order) {    
    const pipe = document.createElement('div');
    pipe.className ="pipe_container";
    for(let ind in colors) {
        const el = document.createElement('div');
        el.style.background = colors[ind];
        el.className ="color-section";
        // el.setAttribute('data',ind+1)
        pipe.appendChild(el);

    }  
    pipe.id = `pipe_${+order+1}`
    container.appendChild(pipe)
    return fillPipe(+order+1,...colors);
    
}
function generateColors(arr,res=[]) {
    
    while (res.length < 4) {
        const randIndex = getRandomIndexInRange(arr.length);
        if(arr[randIndex].volume == 0) {
            arr.splice(randIndex, 1);
            return generateColors(arr,res);
        }
        if(arr[randIndex] && arr[randIndex].volume != 0 && res.filter(c => c==arr[randIndex].color).length <3 ) {
            const firstFull = arr[0]?.volume ==4 
            const secondFull = arr[1]?.volume ==4 
            if(arr.length == 2 && (firstFull || (secondFull))) {
                firstFull && res.push(arr[0].color) && arr[0].volume--;
                secondFull &&  res.push( arr[1].color) && arr[1].volume--
            }
            else {
                res.push(arr[randIndex].color)
                arr[randIndex].volume--;
            }
        }
        
        if(!arr.length) {
            break;
        }
    }
    return res;
}
function getRandomIndexInRange(size) {
   return Math.floor(Math.random() * size);
    
}