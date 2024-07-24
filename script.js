
const tictaktoe = (function () {

    function GameBoard() {
        const size = 3;
        const board = [];
    
        // create a 3x3 array of null BoardSpace objects
        for (let y = 0; y < size; y++) {
            board[y] = [];
            for (let x = 0; x < size; x++) {
                board[y].push(BoardSpace());
            }
        }
    
        const getBoard = () => board;
        const getSpace = (row, col) => board[row][col];
        const fillSpace = (symbol, row, col) => {
            if (board[row][col].getValue() === null) {
                board[row][col].addSymbol(symbol);
            } else {
                console.log(`row:${row} col:${col} is an invalid move`)
                return
            }
            
        }
        const getValues = () => {
            let values = board.map( (row) => row.map( (cell) => {
                return cell.getValue()
            }))
            return values;
        }
    
        return {getBoard, getSpace, fillSpace, getValues};
    }

    function BoardSpace() {
        let value = null;
    
        const addSymbol = (symbol) => {
            value = symbol;
        }
        const getValue = () => value;
    
        return {addSymbol, getValue};
    }

    function GameController(
        playerOneName = 'Player One',
        playerTwoName = 'Player Two'
    ) {
        const board = GameBoard();
    
        const players = [
            {
                name: playerOneName,
                symbol: 'X'
            },
            {
                name: playerTwoName,
                symbol: 'O'
            }
        ];
    
        let currentPlayer = players[0];
    
        // public methods
        const getBoard = () => {
            return board.getBoard();
        }
        const viewBoard = () => {
            console.log(board.getValues());
        }
        const makeMove = (row, col) => {
            board.fillSpace(currentPlayer.symbol, row, col);
            console.log(`${currentPlayer.name} puts a ${currentPlayer.symbol} at ${row}:${col}`);
        }
        const switchPlayer = () => {
            currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
            console.log('players switched');
        }
        const checkWinner = (row, col) => {
            let activeRow = board.getBoard()[row].map((space) => space.getValue());
            let matchedRow = activeRow.filter((space) => space === currentPlayer.symbol);
            let activeCol = board.getBoard().map((row) => row[col].getValue());
            let matchedCol = activeCol.filter((space) => space === currentPlayer.symbol);

            if (matchedRow.length === 3 || matchedCol.length === 3) {
                console.log('game over');
            }
            console.log(matchedRow);
            console.log(matchedCol);
        }
        const playerTurn = (row, col) => {
            makeMove(row, col);
            checkWinner(row, col);
            viewBoard();
            switchPlayer();
        }

        return {getBoard, playerTurn};
    }

    return {GameController};
})();




// test
const game1 = tictaktoe.GameController('Alex', 'Lauren');

game1.playerTurn(0,0);
