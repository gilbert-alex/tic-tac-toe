
const TicTakToe = (function () {

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
        const fillSpace = (symbol, row, col) => {
            if (board[row][col].getValue() === null) {
                board[row][col].addSymbol(symbol);
                return true;
            } else {
                console.log(`Invalid Move: Row:${row} Col:${col} is already taken.`)
                return false;
            }
        }
        const getValues = () => {
            let values = board.map( (row) => row.map( (cell) => {
                return cell.getValue()
            }))
            return values;
        }
    
        return {getBoard, fillSpace, getValues};
    }

    function BoardSpace() {
        // Object to fill each space of the 3x3 grid
        let value = null;
    
        const addSymbol = (symbol) => {
            value = symbol;
        }
        const getValue = () => value;
    
        // exposed to the IIFE
        return {addSymbol, getValue};
    }

    function GameController(
        playerOneName = 'Player One',
        playerTwoName = 'Player Two'
    ) {
        // private variables
        const board = GameBoard();
        let gameOver = false;
    
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
    
        // methods
        const getBoard = () => {
            return board.getBoard();
        }
        const viewBoard = () => {
            console.log(board.getValues());
        }
        const makeMove = (row, col) => {
            if (board.fillSpace(currentPlayer.symbol, row, col)) {
                return true;
            } else {
                return false;
            };
            // console.log(`${currentPlayer.name} puts a ${currentPlayer.symbol} at ${row}:${col}`);
        }
        const switchPlayer = () => {
            currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
            // console.log('players switched');
        }
        const checkWinner = (row, col) => {
            // check win along row
            let matchedRow = board.getValues()[row].filter((space) => space === currentPlayer.symbol);
            // console.log(`row: ${matchedRow}`);

            // check win along column
            let matchedCol = board.getValues().map((row) => row[col]).filter((space) => space === currentPlayer.symbol);
            // console.log(`col: ${matchedCol}`);

            // check win along diagonal top left bottom right (tlbr)
            let tlbr = [];
            for (let i = 0; i < board.getBoard().length; i++) {
                tlbr.push(board.getBoard()[i][i].getValue());
            }
            let matchedTlbr = tlbr.filter((space) => space === currentPlayer.symbol);
            // console.log(`d1: ${matchedTlbr}`);

            // check win along diagonal bottom left top right (bltr)
            let bltr = [];
            for (let j = 0; j < board.getBoard().length; j++){
                bltr.push(board.getValues()[j].at(-(j+1)));
            }
            let matchedBltr = bltr.filter((space) => space === currentPlayer.symbol);
            // console.log(`d2: ${matchedBltr}`);

            if (matchedRow.length === 3 ||
                matchedCol.length === 3 ||
                matchedTlbr.length === 3 ||
                matchedBltr.length === 3
            ) {
                gameOver = true;
            }
        }
        const checkTie = () => {
            let emptySpaces = 0
            board.getValues().map((row) => {row.map((space) => {
                if (space === null) {
                    emptySpaces++;
                }
            })})
            if (emptySpaces === 0) {
                gameOver = true
            };
            // console.log(`there are ${emptySpaces} empty spaces left`);
        }
        const endGame = () => {
            if (gameOver) {
                console.log('game over');
            }
        }
        const playerTurn = (row, col) => {
            if (!gameOver) {
                if (makeMove(row, col)) {
                    checkWinner(row, col);
                    checkTie();
                    // viewBoard();
                    endGame();
                    switchPlayer();
                } else {
                    console.log('try again');
                };

            } else {
                console.log('game is already over');
            }
        }
        const getPlayer = () => currentPlayer.symbol;

        // public methods
        return {playerTurn, getPlayer};
    }

    // creating method
    return {GameController};
})();

function screenController() {
    const game = TicTakToe.GameController();
    const boardDiv = document.querySelector('.board');

    const boardSpaces = boardDiv.querySelectorAll('button');
    boardSpaces.forEach((space) => {
        space.addEventListener('click', () => {
            let [row, col] = space.getAttribute('name').split('-');
            space.textContent = game.getPlayer();
            game.playerTurn(row, col);
        })
    })
}


// test
// const game1 = TicTakToe.GameController();

/* test invalid move and auto player switch*/
// game1.playerTurn(0,0);
// game1.playerTurn(0,0);
// game1.playerTurn(1,1);

/* test row end game condition */
// game1.playerTurn(0,0);
// game1.playerTurn(1,0);
// game1.playerTurn(0,1);
// game1.playerTurn(1,1);
// game1.playerTurn(0,2);

/* test column end game condition */
// game1.playerTurn(0,0);
// game1.playerTurn(0,1);
// game1.playerTurn(1,0);
// game1.playerTurn(1,1);
// game1.playerTurn(2,0);

/* test tlbr end game condition */
// game1.playerTurn(0,0);
// game1.playerTurn(1,0);
// game1.playerTurn(1,1);
// game1.playerTurn(0,2);
// game1.playerTurn(2,2);

/* test bltr end game condition */
// game1.playerTurn(2,0);
// game1.playerTurn(0,1);
// game1.playerTurn(1,1);
// game1.playerTurn(2,1);
// game1.playerTurn(0,2);

/* test tie end game condition */
// game1.playerTurn(0,0);
// game1.playerTurn(0,1);
// game1.playerTurn(1,0);
// game1.playerTurn(1,1);
// game1.playerTurn(2,1);
// game1.playerTurn(2,0);
// game1.playerTurn(0,2);
// game1.playerTurn(1,2);
// game1.playerTurn(2,2);

/* test display */
screenController();