// Making the game board
const gameBoard = (function() {
    let board = ["", "", "",
                 "", "", "",
                 "", "", ""];
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
    const container = document.getElementById("container");
    // Visual Board
    const initBoard = (function() {
        for (i=0; i<3; i++) {
            let row = document.createElement('div');
            row.classList.add("row");
            container.appendChild(row);
            for (j=0; j<3; j++) {
                let box = document.createElement('div');
                row.appendChild(box);
                box.classList.add("box");
                box.id = (i * 3) + j;
                // User Input
                box.onclick = function () {
                    userMove(box);
                }
            }
        }
        // Reset button creation
        const reset = document.createElement("button");
        reset.innerHTML = "Reset";
        reset.classList.add("button")
        container.appendChild(reset);
        reset.onclick = function () {
            game.board = ["", "", "",
                 "", "", "",
                 "", "", ""];
            location.reload();
        }
        // Signature
        const signature = document.createElement("div");
        signature.textContent = "Made By Colin O'Brien";
        signature.style.textAlign = "right";
        signature.style.marginTop = "2%";
        container.appendChild(signature);
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
            // Check rows for a win
            if (board[i * 3] != "" && (board[i * 3] == board[(i * 3) + 1] && board[(i * 3) + 1] == board[(i * 3) + 2])) {
                    console.log(`${board[i * 3]} has won`);
                    game.win = true;
                    winMessage(board[i * 3]);
                    return true;
            // Check columns for a win
            } else if (board[i] != "" && (board[i] == board[i+3] && board[i+3] == board[i+6])) {
                console.log(`${board[i]} has won`);
                winMessage(board[i]);
                game.win = true;
                return true;
            // Check diagonals for a win
            } else if (board[4] != "" && ((board[0] == board[4] && board[4] == board[8]) ||
                        (board[2] == board[4] && board[4] == board[6]))){
                console.log(`${board[4]} has won`);
                game.win = true;
                winMessage(board[4]);
                return true;
            }
        }
        return false;
    }
    // Protocol to check for ties
    const tieCheck = function () {
        let tie = true;
        for (i=0; i<9; i++) {
            if (game.board[i] == "") {
                tie = false;
            }
        }
        if (tie && !win) {
            console.log("It's a tie!");
            return true;
        } else {
            return false;
        }
    }
    const winMessage = function(winner) {
        let winWin = document.createElement("div");
        winWin.classList.add("winMessage");
        winWin.textContent = `${winner} has won!`;
        container.appendChild(winWin);
    }
    const userMove = function(box) {
        if (!game.win) {
            if (board[box.id] == "") {
                board[box.id] = user.token;
                box.textContent = user.token;
                // Player moves:
                console.log("Player moved", game.board);
                // Opponent moves:
                if (!(winCheck()) && !(tieCheck())) {
                    oppMove();
                }
            }
        }
    }
    const oppMove = function() {
        let choice = Math.floor(Math.random() * 9);
        let oppSquare = document.getElementById(`${choice}`);
        if ((board[choice] == "") && win == false) {
            board[choice] = opp.token;
            oppSquare.textContent = opp.token;
            console.log("Opponent moved", game.board);
            winCheck();
            tieCheck();
        } else {
            oppMove();
        }
    }
    return {board, win, winCheck, tieCheck, userMove, oppMove, initPlayers, user, opp};
})();
