let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

function playerMove(index) {
    if (!gameOver && board[index] === '') {
        board[index] = currentPlayer;
        cells[index].innerText = currentPlayer;
        checkGame();
        if (!gameOver) {
            setTimeout(opponentMove, 500); // Delay AI move for better UX
        }
    }
}

function opponentMove() {
    // Check if AI can win
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            if (checkWin('O')) {
                cells[i].innerText = 'O';
                highlightWin(getWinningCondition('O'));
                gameOver = true;
                message.innerText = 'AI wins!';
                return;
            }
            board[i] = ''; // Undo move for future checks
        }
    }

    // Check if player can win and block
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'X';
            if (checkWin('X')) {
                board[i] = 'O';
                cells[i].innerText = 'O';
                checkGame();
                return;
            }
            board[i] = ''; // Undo move for future checks
        }
    }

    // If center is available, take it
    if (board[4] === '') {
        board[4] = 'O';
        cells[4].innerText = 'O';
        checkGame();
        return;
    }

    // Otherwise, take the first available corner
    const corners = [0, 2, 6, 8];
    for (let corner of corners) {
        if (board[corner] === '') {
            board[corner] = 'O';
            cells[corner].innerText = 'O';
            checkGame();
            return;
        }
    }

    // If no corners available, take any available edge
    const edges = [1, 3, 5, 7];
    for (let edge of edges) {
        if (board[edge] === '') {
            board[edge] = 'O';
            cells[edge].innerText = 'O';
            checkGame();
            return;
        }
    }
}

function checkWin(player) {
    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

function getWinningCondition(player) {
    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (board[a] === player && board[b] === player && board[c] === player) {
            return condition;
        }
    }
    return null;
}

function checkGame() {
    // Check for win conditions
    if (checkWin('X')) {
        gameOver = true;
        highlightWin(getWinningCondition('X'));
        message.innerText = 'You win!';
        return;
    } else if (checkWin('O')) {
        gameOver = true;
        highlightWin(getWinningCondition('O'));
        message.innerText = 'AI wins!';
        return;
    }

    // Check for tie
    if (!board.includes('')) {
        gameOver = true;
        message.innerText = "It's a tie!";
        return;
    }

    // Switch player if game is not over
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.innerText = `Current player: ${currentPlayer}`;
}

function highlightWin(condition) {
    if (condition) {
        for (let index of condition) {
            cells[index].style.backgroundColor = 'lightgreen';
        }
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    message.innerText = `Current player: ${currentPlayer}`;
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = 'lightgray';
    });
}

// Initial message
message.innerText = `Current player: ${currentPlayer}`;
