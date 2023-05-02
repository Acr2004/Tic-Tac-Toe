const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const PLAYER1 = "X";
const PLAYER2 = "O";
let currentPlayer = PLAYER1;

let title = document.getElementById('title');
let restart = document.getElementById('reset');
let squares = Array.from(document.getElementsByClassName('squares'));
let spaces = Array(9).fill(null);

// Game
function playerHasWon() {
    for(const combo of win) {
        let [a, b, c] = combo;

        if(spaces[a] && (spaces[a] == spaces[b]) && (spaces[a] == spaces[c])) {
            return [a, b, c];
        }
    }

    return false;
}

const startGame = () => {
    squares.forEach(square => square.addEventListener('click', squareClicked));
}

function squareClicked(e) {
    const id = e.target.id;

    if(!spaces[id]) {
        if(playerHasWon() == false) {
            spaces[id] = currentPlayer;
            e.target.innerText = currentPlayer;

            for(i = 0; i < 9; i++) {
                if(spaces[i] == null) {
                    console.log(i)
                    break;
                }
                else if(i == 8 && spaces[i] != null) {
                    title.innerText = "Tie";
                    return;
                }
            }
        }
        
        if(playerHasWon() != false) {
            title.innerText = `${currentPlayer} Has Won!`;
            
            let wonSquares = playerHasWon();
            wonSquares.map(square => squares[square].style.backgroundColor="rgb(39, 46, 56)")
            return;
        }

        currentPlayer = currentPlayer == PLAYER1 ? PLAYER2 : PLAYER1;
    }
}

// Reset Game
restart.addEventListener('click', resetSquares);

function resetSquares() {
    spaces.fill(null);
    squares.forEach(square => {
        square.innerText = ""
        square.style.backgroundColor="rgb(29, 36, 46)"
    });
    title.innerText = "Tic Tac Toe";

    currentPlayer = PLAYER1;
}


// Start The Game
startGame();