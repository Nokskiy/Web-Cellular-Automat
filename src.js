let cnv = document.getElementById("cnv");
let ctx = cnv.getContext("2d");
let w = cnv.width = window.innerWidth;
let h = cnv.height = window.innerHeight;

ctx.strokeStyle = "blue";
ctx.lineWidth  = 5;

let interval = setInterval(update,500);

let x = 200;
let y = 100;

let step = 10;

class cell
{
    constructor(alive)
    {
        this.alive = alive;
    } 
}

let cells = [];
let nextGenCells = [];
    

fillCells();
update();
function update()
{
    ctx.clearRect(0,0,w,h);

    cellsStatusCheck();
    drawCells();
    drawGrid();

    cells = nextGenCells;
}

function cellsStatusCheck()
{
    nextGenCells = [];
    
    for(let i = 0; i < x; i++)
    {
        nextGenCells[i] = [];
        for(let j = 0; j < y; j++)
        {
            nextGenCells[i][j] = new cell(cells[i][j].alive);
        }
    }

    for(let i = 0; i < x; i++)
    {
        for(let j = 0; j < y; j++)
        {
            let nc = 0;
            
            for(let neighboursX = -1; neighboursX <= 1; neighboursX++)
            {
                for(let neighboursY = -1; neighboursY <= 1; neighboursY++)
                {
                    if(neighboursX == 0 && neighboursY == 0) continue;
                    
                    let ni = i + neighboursX;
                    let nj = j + neighboursY;
                    
                    if(ni >= 0 && ni < x && nj >= 0 && nj < y && cells[ni][nj].alive)
                    {
                        nc++;
                    }
                }
            }

            if(cells[i][j].alive) //Survive
            {
                nextGenCells[i][j].alive = (nc == 1 || nc == 2 || nc == 3);
            }
            else //Born
            {
                nextGenCells[i][j].alive = (nc == 2);
            }
        }
    }
}

function fillCells()
{
    for(let width = 0; width < x; width++)
    {
        cells[width] = [];
        for(let height = 0; height < y; height++)
        {
            cells[width][height] = new cell(false);
        }
    }

    //starting filling
    cells[x/2][y/2].alive = true;
    cells[x/2][y/2 + 1].alive = true;
    cells[x/2 + 1][y/2].alive = true;
    cells[x/2 - 1][y/2].alive = true;
    cells[x/2][y/2 -1].alive = true;
}

function drawCells()
{
    ctx.fillStyle = "black";
    
    for(let width = 0; width < x; width++)
    {
        for(let height = 0; height < y; height++)
        {
            if(cells[width][height].alive)
            {
                ctx.fillRect(width*step, height*step, step, step);
            }
        }
    }
}

function drawGrid()
{
    ctx.strokeStyle = "rgb(172, 120, 207)";
    ctx.lineWidth = 2;
    ctx.beginPath();

    for(let i = 0; i <= x; i++)
    {
        ctx.moveTo(i*step, 0);
        ctx.lineTo(i*step, y*step);
    }
    for(let i = 0; i <= y; i++)
    {
        ctx.moveTo(0, i*step);
        ctx.lineTo(x*step, i*step);
    }
    
    ctx.stroke();
}