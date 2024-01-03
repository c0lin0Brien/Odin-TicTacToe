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
    const p1 = player("X");
    const p2 = player("O");
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
                win = true;
                console.log(`${board[4]} has won`);
            }
        }
    }
    return {board, win, p1, p2, winCheck};
})();
