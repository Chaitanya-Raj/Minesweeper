let size = 4;
let testMode = true;

let grid = document.getElementById("grid-container");

function generateGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  let count = 0;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-index", count++);
      cell.setAttribute("data-mine", false);
      cell.addEventListener("click", (e) => {
        clickCell(e.target);
      });
      grid.appendChild(cell);
    }
  }
  addMines();
}

function addMines() {
  for (let i = 0; i < size; i++) {
    let index = Math.floor((Math.random() * 10) % (size * size));
    let cell = document.querySelector(`[data-index="${index}"]`);
    cell.setAttribute("data-mine", "true");
    if (testMode) {
      cell.innerHTML = "X";
      revealMines();
    }
  }
}

function revealMines() {
  for (let i = 0; i < size * size; i++) {
    let cell = document.querySelector(`[data-index="${i}"]`);
    if (cell.getAttribute("data-mine") == "true") cell.className = "mine";
  }
}

function checkLevelCompletion() {
  let levelComplete = true;
  for (let i = 0; i < size * size; i++) {
    let cell = document.querySelector(`[data-index="${i}"]`);
    if (cell.getAttribute("data-mine") == "false" && cell.innerHTML == "")
      levelComplete = false;
  }
  if (levelComplete) {
    alert("You Win!");
    revealMines();
  }
}

function clickCell(cell) {
  //Check if the end-user clicked on a mine
  if (cell.getAttribute("data-mine") == "true") {
    revealMines();
    alert("Game Over");
  } else {
    cell.classList.add("clicked");
  }
}

generateGrid(size);
