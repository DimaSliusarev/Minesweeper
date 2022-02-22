StartGame(10, 10, 20); // Minesweeper start

function StartGame (WIDTH, HEIGHT, BOMBS) { // function that have 3 params and starting the game
const field = document.querySelector('.field'); // field detection, we don`t need it to be changed so it`s const
const CellsCount = WIDTH * HEIGHT; // amount of cells, const
field.innerHTML = '<button></button>'.repeat(CellsCount); // using .innerHTML we creating buttons for all of the cells
const cells = [...field.children]; // massive of all buttons 

let ClosedCells = CellsCount;

const bombs = [...Array(CellsCount).keys()] // bomb massive
.sort (() => Math.random() - 0.5) // sorting our massive in random way
.slice (0, BOMBS); // taking place for only BOMBS AMOUNT (in our case its 20)

field.addEventListener('click', (event) => { // checking where user click, if it`s not field button it will not counts
    if (event.target.tagName !== 'BUTTON') { 
        return;
    }

    const index = cells.indexOf(event.target); // bow we are checking, the index of the cell, (1,10,100)
    const column = index % WIDTH; 
    const row = (index - column) / WIDTH; 
    open (row, column); // function that show is this cell a bomb, or how many bombs around
});

function CellValid (row, column) { // this function check the valid of cells x and y
    return row >=0 && row < HEIGHT && column >= 0 && column < WIDTH;

}

function MinesAround (row, column) { // this function checks the cells around of the cell that we picked. If there is any bombs around, it will show it
    let count = 0;
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++ ) {
            if (BombOrNot(row + y, column + x)){
                count++;
            }
        }
    }
    return count;
}

function open (row, column) { // this function showing us 'X' if its bomb, and numbers if its not + disabling the button 
    if (!CellValid(row, column)) return;

    const index = row * WIDTH + column;
    const cell = cells[index];

    if (cell.disabled === true) return;

    cell.disabled = true;
    ClosedCells--;
    if (ClosedCells <= BOMBS) {
        alert ('Congratulations! You won!');
        return;
    }

    if (BombOrNot(row, column)) {
        cell.innerHTML = 'X';
        alert ('You loose!');
        return; 
    }

    const count =  MinesAround(row, column);    
    if (count !== 0) {
       cell.innerHTML = count;
       return;
   }

   for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++ ) {
        open(row + y, column + x);
            
        
    }
}
    
}

function BombOrNot(row, column){ // function that checks is it bomb or not=
    if (!CellValid(row, column)) // to make the edges properly
    return false;
    const index = row * WIDTH + column;

    return bombs.includes(index);
    
}
}