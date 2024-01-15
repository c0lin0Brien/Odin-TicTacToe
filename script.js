// Making the Game Board
const gameBoard = (function() {
    let board = ["1", "2", "3",
                 "4", "5", "6",
                 "7", "8", "9"];
    return {board};
})();
// Player Object
const player = function(token) {
    return {token}; 
}
// Game Object
const game = (function() {
    let board = gameBoard.board;
    let win = false;
    let borders = [];
    const initBoard = (function() {
        for (i=0; i<3; i++) {
            const container = document.getElementById("container");
            let row = document.createElement('div');
            row.classList.add("row");
            container.appendChild(row);
            for (j=0; j<3; j++) {
                let box = document.createElement('div');
                row.appendChild(box);
                box.classList.add("box");
                // box.textContent = board[(i * 3) + j];
                box.id = (i * 3) + j;
                box.onclick = function () {
                    board[box.id] = "X";
                    box.textContent = "X";
                }
            }
        }
    })();
    const initPlayers = function (selection, other) {
        let user = player(selection);
        let opp = player(other);
        return [user, opp];
    }
    // For testing purposes we'll keep it like this
    const [user, opp] = initPlayers("X", "O");
    const winCheck = function () {
        for (i=0; i<3; i++) {
            // Check rows and columns for 3 in a row
            if (board[i] != "" && (board[i] == board[i+1] && board[i+1] == board[i+2] ||
                board[i] == board[i+3] && board[i+3] == board[i+6])) {
                    game.win = true;
                    console.log(`${board[i]} has won`);
            // Check diagonals for a win
            } else if (board[4] != "" && ((board[0] == board[4] && board[4] == board[8]) ||
                        (board[2] == board[4] && board[4] == board[6]))){
                game.win = true;
                console.log(`${board[4]} has won`);
            }
        }
        // // Check for ties
        if (tieCheck()) {
            console.log("It's a tie!");
        }
    }
    // Protocol to check for ties
    const tieCheck = function () {
        let tie = true;
        for (i=0; i<9; i++) {
            if (game.board[i] == "") {
                tie = false;
            }
        }
        return tie;
    }
    const userMove = function(tile) {
        if (board[tile] == "") {
            board[tile] = user.token;
            // Player moves:
            console.log("Player moved", game.board);
            winCheck();
            // Opponent moves:
            if (!(tieCheck())) {
                oppMove();
            }
        }
    }
    const oppMove = function() {
        let choice = Math.floor(Math.random() * 9);
        if (board[choice] == 0) {
            board[choice] = opp.token;
            console.log("Opponent moved", game.board);
            winCheck();
        } else {
            oppMove();
        }
    }
    return {board, win, winCheck, tieCheck, userMove, oppMove, initPlayers, user, opp};
})();
