let size = 8;
bombCount = size * 2;
let testMode = false;

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

//adds mines in random cells
function addMines() {
  for (let i = 0; i < bombCount; i++) {
    let index = Math.floor(Math.random() * size * size);
    console.log(index);

    let cell = document.querySelector(`[data-index="${index}"]`);
    cell.setAttribute("data-mine", "true");
    if (testMode) {
      cell.innerHTML = "X";
      revealMines();
    }
  }
}

//add red color to the cells having mines
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

//onclick method for cells
function clickCell(cell) {
  if (cell.getAttribute("data-mine") == "true") {
    revealMines();
    alert("Game Over");
  } else {
    cell.className = "clicked";

    //Count and display the number of adjacent mines
    let mineCount = 0;
    let index = cell.getAttribute("data-index");
    let cellRow = Math.floor(parseInt(index) / size);
    let cellCol = parseInt(index) % size;
    // alert(`Row : ${cellRow}   Column : ${cellCol}`);
    for (
      let i = Math.max(cellRow - 1, 0);
      i <= Math.min(cellRow + 1, size - 1);
      i++
    ) {
      for (
        let j = Math.max(cellCol - 1, 0);
        j <= Math.min(cellCol + 1, size - 1);
        j++
      ) {
        if (
          document
            .querySelector(`[data-index="${i * size + j}"]`)
            .getAttribute("data-mine") == "true"
        )
          mineCount++;
      }
    }

    cell.innerHTML = mineCount;

    if (mineCount == 0) {
      //Reveal all adjacent cells as they do not have a mine
      for (
        let i = Math.max(cellRow - 1, 0);
        i <= Math.min(cellRow + 1, size - 1);
        i++
      ) {
        for (
          let j = Math.max(cellCol - 1, 0);
          j <= Math.min(cellCol + 1, size - 1);
          j++
        ) {
          //Recursive Call
          if (
            document.querySelector(`[data-index="${i * size + j}"]`)
              .innerHTML == ""
          )
            clickCell(document.querySelector(`[data-index="${i * size + j}"]`));
        }
      }
    }
    checkLevelCompletion();
  }
}

generateGrid(size);
