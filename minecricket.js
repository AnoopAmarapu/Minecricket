document.addEventListener('DOMContentLoaded', function() {
  const grid = document.querySelector('.grid');
  const gridSize = 6; // Change to 7 for a 7x7 grid
  const totalBlocks = gridSize * gridSize;
  let fielders = []; // Array to store the fielder positions
  let score = 0;

  function createGrid() {
    const table = document.createElement('table');
    for (let i = 0; i < gridSize; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < gridSize; j++) {
        const cell = document.createElement('td');
        cell.classList.add('block');
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    grid.appendChild(table);
  }

  function placeFielders() {
    while (fielders.length < 11) {
      const randomBlock = Math.floor(Math.random() * totalBlocks);
      if (!fielders.includes(randomBlock)) {
        fielders.push(randomBlock);
      }
    }
  }

  function placeNumbers() {
    for (let i = 0; i < totalBlocks; i++) {
      if (!fielders.includes(i)) {
        const block = grid.querySelectorAll('.block')[i];
        const number = Math.ceil(Math.random() * 6);
        block.dataset.number = number;
      }
    }
  }

  function handleClick(event) {
    const clickedBlock = event.target;
    if (clickedBlock.classList.contains('block')) {
      const blockIndex = Array.from(grid.querySelectorAll('.block')).indexOf(clickedBlock);

      if (fielders.includes(blockIndex)) {
        endGame();
      } else if (!clickedBlock.classList.contains('clicked')) {
        clickedBlock.classList.add('clicked');
        clickedBlock.textContent = clickedBlock.dataset.number;
        score += parseInt(clickedBlock.dataset.number);
        updateScore();
      }
    }
  }

  function updateScore() {
    const scoreBox = document.querySelector('.score');
    scoreBox.textContent = 'Score: ' + score;
  }

  function endGame() {
    alert('Game Over! Final score: ' + score);
    newGame();
  }

  function newGame() {
    fielders = [];
    score = 0;
    updateScore();
    grid.innerHTML = '';
    createGrid();
    placeFielders();
    placeNumbers();
  }

  createGrid();
  placeFielders();
  placeNumbers();

  grid.addEventListener('click', handleClick);
});