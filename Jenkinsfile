<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chess Game</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        #game-area {
            display: flex;
            align-items: center;
        }
        #chessboard {
            display: grid;
            grid-template-columns: repeat(8, 50px);
            grid-template-rows: repeat(8, 50px);
            width: 400px;
            height: 400px;
            border: 2px solid black;
            position: relative;
            margin: 20px;
        }
        .cell {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
        }
        /* Karelerin standart satranç tahtası gibi renklendirilmesi */
        .cell[data-row-even="true"][data-col-even="false"],
        .cell[data-row-even="false"][data-col-even="true"] {
            background-color: #b58863; /* Koyu renk */
        }
        .cell[data-row-even="true"][data-col-even="true"],
        .cell[data-row-even="false"][data-col-even="false"] {
            background-color: #f0d9b5; /* Açık renk */
        }
        .white-piece, .black-piece {
            width: 45px;
            height: 45px;
        }
        .captured-pieces {
            display: flex;
            flex-direction: column;
            width: 100px;
            text-align: center;
        }
        .captured-pieces h3 {
            margin-bottom: 10px;
        }
        .captured-pieces img {
            width: 45px;
            height: 45px;
        }
        .board-label {
            position: absolute;
            font-size: 12px;
            color: #000;
        }
        .file-label {
            top: -20px;
        }
        .rank-label {
            left: -20px;
        }
        #game-status {
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Chess Game</h1>
    <div id="game-area">
        <div class="captured-pieces" id="white-captured">
            <h3>White Captured</h3>
        </div>
        <div id="chessboard"></div>
        <div class="captured-pieces" id="black-captured">
            <h3>Black Captured</h3>
        </div>
    </div>
    <button onclick="startGame()">Start Game</button>
    <div id="game-status"></div>
    <script>
        const chessboard = document.getElementById('chessboard');
        const whiteCaptured = document.getElementById('white-captured');
        const blackCaptured = document.getElementById('black-captured');
        const gameStatus = document.getElementById('game-status');

        const initialBoard = [
            ["black-rook", "black-knight", "black-bishop", "black-queen", "black-king", "black-bishop", "black-knight", "black-rook"],
            ["black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn"],
            ["white-rook", "white-knight", "white-bishop", "white-queen", "white-king", "white-bishop", "white-knight", "white-rook"]
        ];

        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

        let currentPlayer = 'white'; // Beyaz başlar
        let selectedPiece = null;
        let selectedCell = null;

        function startGame() {
            gameStatus.innerText = "";
            makePiecesDraggable();
        }

        function createBoard() {
            chessboard.innerHTML = ''; // Tahtayı temizle ve yeniden oluştur

            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    const cell = document.createElement('div');
                    cell.classList.add('cell');
                    cell.setAttribute('data-row', row);
                    cell.setAttribute('data-col', col);

                    // Satır ve sütun paritesine göre renklendirme
                    cell.setAttribute('data-row-even', row % 2 === 0);
                    cell.setAttribute('data-col-even', col % 2 === 0);

                    const piece = initialBoard[row][col];
                    if (piece) {
                        const pieceElement = document.createElement('img');
                        pieceElement.src = `/images/${piece}.png`;
                        pieceElement.classList.add(piece.includes('white') ? 'white-piece' : 'black-piece');
                        pieceElement.setAttribute('data-piece', piece);
                        cell.appendChild(pieceElement);
                    }

                    chessboard.appendChild(cell);

                    // Kare konumlarını ekleyelim
                    if (col === 0) {
                        const rankLabel = document.createElement('div');
                        rankLabel.classList.add('board-label', 'rank-label');
                        rankLabel.style.top = `${row * 50 + 20}px`;
                        rankLabel.innerText = ranks[row];
                        chessboard.appendChild(rankLabel);
                    }

                    if (row === 7) {
                        const fileLabel = document.createElement('div');
                        fileLabel.classList.add('board-label', 'file-label');
                        fileLabel.style.left = `${col * 50 + 20}px`;
                        fileLabel.innerText = files[col];
                        chessboard.appendChild(fileLabel);
                    }
                }
            }
        }

        function makePiecesDraggable() {
            const cells = document.querySelectorAll('.cell');

            cells.forEach(cell => {
                cell.addEventListener('click', () => {
                    const pieceElement = cell.querySelector('img');

                    if (selectedPiece) {
                        const targetPiece = cell.querySelector('img');

                        if (isValidMove(selectedPiece.getAttribute('data-piece'), selectedCell, cell, targetPiece)) {
                            if (targetPiece) {
                                capturePiece(targetPiece);
                            }

                            cell.innerHTML = ''; // Hedef hücreyi temizle
                            cell.appendChild(selectedPiece);
                            checkForWin();
                            switchPlayer();
                        } else {
                            selectedCell.appendChild(selectedPiece); // Geçersiz hamle, taşı geri koy
                        }

                        selectedPiece = null;
                        selectedCell = null;
                    } else if (pieceElement && pieceElement.getAttribute('data-piece').includes(currentPlayer)) {
                        selectedPiece = pieceElement;
                        selectedCell = cell;
                        selectedPiece = selectedCell.removeChild(selectedPiece); // Taşı hücreden çıkar
                    }
                });
            });
        }

        function capturePiece(piece) {
            if (piece.getAttribute('data-piece').includes('white')) {
                blackCaptured.appendChild(piece);
            } else {
                whiteCaptured.appendChild(piece);
            }
        }

        function isValidMove(piece, startCell, targetCell, targetPiece) {
            const pieceType = piece.split('-')[1];
            const startRow = parseInt(startCell.getAttribute('data-row'));
            const startCol = parseInt(startCell.getAttribute('data-col'));
            const endRow = parseInt(targetCell.getAttribute('data-row'));
            const endCol = parseInt(targetCell.getAttribute('data-col'));

            if (targetPiece && targetPiece.getAttribute('data-piece').includes(currentPlayer)) {
                return false; // Kendi taşını yiyemezsin
            }

            switch (pieceType) {
                case 'pawn':
                    return isValidPawnMove(startRow, startCol, endRow, endCol, piece, targetPiece);
                case 'rook':
                    return isValidRookMove(startRow, startCol, endRow, endCol);
                case 'knight':
                    return isValidKnightMove(startRow, startCol, endRow, endCol);
                case 'bishop':
                    return isValidBishopMove(startRow, startCol, endRow, endCol);
                case 'queen':
                    return isValidQueenMove(startRow, startCol, endRow, endCol);
                case 'king':
                    return isValidKingMove(startRow, startCol, endRow, endCol);
                default:
                    return false;
            }
        }

                function isValidPawnMove(startRow, startCol, endRow, endCol, piece, targetPiece) {
            const direction = piece.includes('white') ? -1 : 1; // Beyaz yukarı (negatif), siyah aşağı (pozitif) ilerler
            const startRowForPawn = piece.includes('white') ? 6 : 1;

            // Düz hareket
            if (startCol === endCol) {
                if (startRow + direction === endRow && !targetPiece) return true;
                if (startRow === startRowForPawn && startRow + 2 * direction === endRow && !targetPiece) return true;
            }

            // Çapraz hareket
            if (Math.abs(startCol - endCol) === 1 && startRow + direction === endRow && targetPiece) {
                return true;
            }

            return false;
        }

        function isValidRookMove(startRow, startCol, endRow, endCol) {
            if (startRow !== endRow && startCol !== endCol) return false;

            // Arada taş var mı kontrol et
            if (startRow === endRow) {
                const step = startCol < endCol ? 1 : -1;
                for (let col = startCol + step; col !== endCol; col += step) {
                    if (document.querySelector(`[data-row="${startRow}"][data-col="${col}"]`).innerHTML !== '') return false;
                }
            } else {
                const step = startRow < endRow ? 1 : -1;
                for (let row = startRow + step; row !== endRow; row += step) {
                    if (document.querySelector(`[data-row="${row}"][data-col="${startCol}"]`).innerHTML !== '') return false;
                }
            }

            return true;
        }

        function isValidKnightMove(startRow, startCol, endRow, endCol) {
            const rowDiff = Math.abs(startRow - endRow);
            const colDiff = Math.abs(startCol - endCol);
            return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
        }

        function isValidBishopMove(startRow, startCol, endRow, endCol) {
            if (Math.abs(startRow - endRow) !== Math.abs(startCol - endCol)) return false;

            const rowStep = startRow < endRow ? 1 : -1;
            const colStep = startCol < endCol ? 1 : -1;
            let row = startRow + rowStep;
            let col = startCol + colStep;

            while (row !== endRow && col !== endCol) {
                if (document.querySelector(`[data-row="${row}"][data-col="${col}"]`).innerHTML !== '') return false;
                row += rowStep;
                col += colStep;
            }

            return true;
        }

        function isValidQueenMove(startRow, startCol, endRow, endCol) {
            return isValidRookMove(startRow, startCol, endRow, endCol) || isValidBishopMove(startRow, startCol, endRow, endCol);
        }

        function isValidKingMove(startRow, startCol, endRow, endCol) {
            const rowDiff = Math.abs(startRow - endRow);
            const colDiff = Math.abs(startCol - endCol);
            return rowDiff <= 1 && colDiff <= 1;
        }

        function switchPlayer() {
            currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
        }

        function checkForWin() {
            const whiteKing = document.querySelector('[data-piece="white-king"]');
            const blackKing = document.querySelector('[data-piece="black-king"]');

            if (!whiteKing) {
                gameStatus.innerText = "Black wins!";
                endGame();
            } else if (!blackKing) {
                gameStatus.innerText = "White wins!";
                endGame();
            }
        }

        function endGame() {
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.replaceWith(cell.cloneNode(true)); // Tüm click eventlerini temizler
            });
        }

        createBoard();
    </script>
</body>
</html>

