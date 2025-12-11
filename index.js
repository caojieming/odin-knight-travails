function knightMoves(start, end) {
    // stores all visted cells, doubles as a visual representation of the board state
    const board = Array.from(Array(8), _ => Array(8).fill(' '));

    // queue array for storing cells to compare with end, each item will be: [[x, y], [...pathToThisCell]]
    const queue = [];
    // output, aka the list of steps from start to end
    let out = [];

    // add start to queue (items are [cell, [path to cell]])
    queue.push([start, [start]]);

    // iterate while queue has content and out is empty/not set
    while(queue.length > 0 && out.length === 0) {
        // "pop" the front of queue, and split into cell position and path
        const qFront = queue.shift();
        const cell = qFront[0];
        const path = qFront[1];

        // add cell to board to indicate it has been visited
        board[cell[0]][cell[1]] = '*';
        // printBoard(board, cell);

        // check if cell is equal to end, set out to path (this will end the loop)
        if(cell[0] === end[0] && cell[1] === end[1]) {
            out = path;
        }
        // else, add all possible moves from current cell to end of queue
        else {
            const moveList = getMoves(board, cell);
            for(let i = 0; i < moveList.length; i++) {
                const possibleMove = moveList[i];
                queue.push([possibleMove, [...path, possibleMove]]);
            }
        }
    }

    return out;
}


// returns a list of [row, col]'s that a knight can move to given the input cell
function getMoves(board, cell) {
    const row = cell[0];
    const col = cell[1];

    // all possible moves (may include out of bounds)
    const out = [
        [row+1, col+2],
        [row+2, col+1],
        [row-1, col+2],
        [row-2, col+1],
        [row+1, col-2],
        [row+2, col-1],
        [row-1, col-2],
        [row-2, col-1]
    ]

    // remove out of bounds moves + remove moves to already visited cells on the input board
    for(let i = 0; i < out.length; i++) {
        // some part is out of bounds (assuming using a normal 8x8 chess grid)
        if(out[i][0] < 0 || out[i][0] > 7 || out[i][1] < 0 || out[i][1] > 7) {
            out.splice(i, 1);
            // compensate for items shifting due to deletion
            i--;
        }
        // moving to an already visited cell
        else if(board[out[i][0]][out[i][1]] === '*') {
            out.splice(i, 1);
            // compensate for items shifting due to deletion
            i--;
        }
    }

    return out;
}


// mainly for debugging
function printBoard(board, recent) {
    console.log("x  0  1  2  3  4  5  6  7");
    for(let r = 0; r < board.length; r++) {
        let rowStr = `${r}  `;
        for(c = 0; c < board[0].length; c++) {
            // basically just shows the most recently visited cell as an "X" instead of a "*"
            if(r === recent[0] && c === recent[1]) {
                rowStr += `X  `;
            }
            else {
                rowStr += `${board[r][c]}  `;
            }
        }
        console.log(rowStr);
    }
    console.log();
}
