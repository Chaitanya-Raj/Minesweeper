let grid = document.getElementById("grid-container");

function defaultGrid(size) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      grid.appendChild(cell);
    }
  }
}

function newGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

newGrid(8);
defaultGrid(8);
