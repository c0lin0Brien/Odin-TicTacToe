// Making the Game Board
const gameBoard = (function() {
    let board = [0, 0, 0,
                 0, 0, 0,
                 0, 0, 0];
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
    const initGame = function (selection, other) {
        let user = player(selection);
        let opp = player(other);
        return [user, opp];
    }
    // For testing purposes we'll keep it like this
    const [user, opp] = initGame("X", "O");
    const winCheck = function () {
        for (i=0; i<3; i++) {
            // Check rows and columns for 3 in a row
            if (board[i] != 0 && (board[i] == board[i+1] && board[i+1] == board[i+2] ||
                board[i] == board[i+3] && board[i+3] == board[i+6])) {
                    game.win = true;
                    console.log(`${board[i]} has won`);
            // Check diagonals for a win
            } else if (board[4] != 0 && ((board[0] == board[4] && board[4] == board[8]) ||
                        (board[2] == board[4] && board[4] == board[6]))){
                game.win = true;
                console.log(`${board[4]} has won`);
            }
        }
    }
    const userMove = function(tile) {
        if (board[tile] == 0) {
            board[tile] = user.token;
            // Player moves:
            console.log("Player moved", game.board);
            winCheck();
            // Opponent moves:
            oppMove();
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
    return {board, win, winCheck, userMove, oppMove, initGame, user, opp};
})();
