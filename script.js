
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
                return false;
            }
        }

        const getValues = () => {
            let values = board.map(row => row.map(cell => cell.getValue()))
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

        const board = GameBoard();
        let gameOver = false;
        let draw = false;
    
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

        const makeMove = (row, col) => {
            if (board.fillSpace(currentPlayer.symbol, row, col)) {
                return true;
            } else {
                return false;
            };
        }

        const switchPlayer = () => {
            currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
        }

        const checkWinner = (row, col) => {
            // check win along row
            let matchedRow = board.getValues()[row].filter(
                space => space === currentPlayer.symbol);

            // check win along column
            let matchedCol = board.getValues().map(
                row => row[col]).filter(
                    space => space === currentPlayer.symbol);

            // check win along diagonal top left bottom right (tlbr)
            let tlbr = [];
            for (let i = 0; i < board.getBoard().length; i++) {
                tlbr.push(board.getBoard()[i][i].getValue());
            }
            let matchedTlbr = tlbr.filter(space => space === currentPlayer.symbol);

            // check win along diagonal bottom left top right (bltr)
            let bltr = [];
            for (let j = 0; j < board.getBoard().length; j++){
                bltr.push(board.getValues()[j].at(-(j+1)));
            }
            let matchedBltr = bltr.filter(space => space === currentPlayer.symbol);

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
                gameOver = true;
                draw = true;
            };
        }

        const playerTurn = (row, col) => {
            if (!gameOver) {
                if (makeMove(row, col)) {
                    checkWinner(row, col);
                    checkTie();
                    return true;
                } else {
                    return false;
                }
            }
        }

        const getPlayer = () => currentPlayer;

        const getValues = () => board.getValues();

        const getGameOver = () => gameOver;

        const getDraw = () => draw;

        // public methods
        return {playerTurn, switchPlayer, getPlayer, getValues, getGameOver, getDraw};
    }

    // creating method
    return {GameController};
})();


function screenController() {
    const newBtn = document.getElementById('new');
    const playerDiv = document.querySelector('.player');
    const boardDiv = document.querySelector('.board');

    newBtn.addEventListener('click', () => newGame());

    const newGame = () => {
        // user input names
        const p1Name = document.getElementById('p1').value;
        const p2Name = document.getElementById('p2').value;

        // call for new game object
        const game = TicTakToe.GameController(p1Name, p2Name);
        initBoard(game);
    }

    // give each button interactivity with the game object
    const initBoard = (game) => {

        playerDiv.textContent = `${game.getPlayer().name}'s turn`

        const boardSpaces = boardDiv.querySelectorAll('button');

        boardSpaces.forEach((btn) => {
            btn.addEventListener('click', () => {

                // get space index from DOM
                let [row, col] = btn.getAttribute('name').split('-');
                
                if (game.playerTurn(row, col)) {
                    // get current game state and update DOM
                    const memory = game.getValues();
                    btn.textContent = memory[row][col];

                    if (game.getDraw()) {
                        // change display for draw
                        playerDiv.textContent = 'Draw';
                    }
                    else if (game.getGameOver()) {
                        // change display to winning player
                        let activePlayer = game.getPlayer();
                        playerDiv.textContent = `${activePlayer.name} wins`;
                    } else {
                        // switch player for next turn
                        game.switchPlayer();
                        let activePlayer = game.getPlayer();
                        playerDiv.textContent = `${activePlayer.name}'s turn`;
                    }
                }
            })
        })
    }
}

/* test display */
screenController();