document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementsByClassName("game-title")[0].style.visibility = "visible"
        document.getElementById('check-solution').style.visibility = "visible";
    }, 2000)
    const sudokuContainer = document.getElementById('sudoku-container');
    const solutionButton = document.getElementById('check-solution');

    // Example Sudoku puzzle
    const puzzle = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    // Create the Sudoku grid
    function createGrid() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                if (puzzle[row][col] !== 0) {
                    cell.innerText = puzzle[row][col];
                } else {
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.min = 1;
                    input.max = 9;
                    cell.appendChild(input);
                }
                sudokuContainer.appendChild(cell);
            }
        }
    }

    function checkSolution() {
        const cells = document.querySelectorAll('.cell');
        let isValid = true;

        // Collect the current state of the grid
        const currentGrid = Array.from(cells).map((cell, index) => {
            if (cell.children.length > 0) {
                return parseInt(cell.children[0].value) || 0;
            }
            return parseInt(cell.innerText);
        });

        // Check rows, columns, and 3x3 squares
        for (let i = 0; i < 9; i++) {
            const row = currentGrid.slice(i * 9, i * 9 + 9);
            const col = currentGrid.filter((_, index) => index % 9 === i);
            const square = currentGrid.filter((_, index) =>
                Math.floor(index / 27) === Math.floor(i / 3) &&
                Math.floor(index % 9 / 3) === i % 3
            );

            if (!isValidSet(row) || !isValidSet(col) || !isValidSet(square)) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            alert('Solution is correct!');
        } else {
            alert('Solution is incorrect!');
        }
    }

    function isValidSet(numbers) {
        const numSet = new Set(numbers);
        return numSet.size === 9 && !numSet.has(0);
    }

    createGrid();
    solutionButton.addEventListener('click', checkSolution);
});