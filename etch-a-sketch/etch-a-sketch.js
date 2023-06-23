const jsGrid = document.querySelector('.js-grid');

function createGrids(number) {
  return ('<div class="grid-item js-grid-item"></div>').repeat(number * number);
}

const DEFAULT_SIZE = 32;
let currentSize = DEFAULT_SIZE;
let currentColor = 'dimgray';
let isMouseDown = false;

const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const clearButton = document.querySelector('.js-clear-button');
const toggleGridButton = document.querySelector('.js-toggle-grid-button');
const toggleEraserButton = document.querySelector('.js-toggle-eraser');

let previousColor = currentColor;
let isGridLinesVisible = true;
let isEraserActive = true;

function toggleGrid() {
  const gridItems = document.querySelectorAll('.js-grid-item');
  isGridLinesVisible = !isGridLinesVisible;

  if (isGridLinesVisible) {
    gridItems.forEach(gridItem => {
      gridItem.style.border = "solid 0.5px lightgray";
    });
  } else {
    gridItems.forEach(gridItem => {
      gridItem.style.border = "";
    });
  }
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

function setCurrentColor(color) {
  currentColor = color;
}

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`;
}

function changeSize(value) {
  setCurrentSize(value);
  updateSizeValue(value);
  reloadGrid();
}

function reloadGrid() {
  clearGrid();
  setupGrid(currentSize);
}

function clearGrid() {
  jsGrid.innerHTML = '';
}

sizeSlider.addEventListener('mousemove', (e) => updateSizeValue(e.target.value));
sizeSlider.addEventListener('change', (e) => changeSize(e.target.value));

const colorPicker = document.getElementById('color-picker');
colorPicker.value = '#696969';

colorPicker.addEventListener('input', (event) => {
  setCurrentColor(event.target.value);
});

function toggleEraser() {
  isEraserActive = !isEraserActive;

  if (isEraserActive) {
    previousColor = currentColor;
    currentColor = 'white';
  } else {
    currentColor = previousColor;
  }
}

function setupGrid(size) {
  jsGrid.innerHTML = createGrids(size);

  jsGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  jsGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  const gridItems = document.querySelectorAll('.js-grid-item');
  gridItems.forEach(gridItem => {
    gridItem.addEventListener('mousedown', () => {
      isMouseDown = true;
    });

    gridItem.addEventListener('mousemove', (event) => {
      if (isMouseDown) {
        const currentGridItem = event.target;
        currentGridItem.style.backgroundColor = currentColor;
      }
    });

    gridItem.addEventListener('mouseup', () => {
      isMouseDown = false;
    });
  });

  if (isGridLinesVisible) {
    gridItems.forEach(gridItem => {
      gridItem.style.border = "solid 0.5px lightgray";
    });
  }
}

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
};

clearButton.addEventListener('click', (e) => reloadGrid());

toggleGridButton.addEventListener('click', (e) => {
  toggleGrid(); 

  if (toggleGridButton.style.backgroundColor === "rgb(144, 199, 233)") {
    toggleGridButton.style.backgroundColor = "rgb(92, 161, 204)";
  } else {
    toggleGridButton.style.backgroundColor = "rgb(144, 199, 233)";
  }
});
  
toggleEraserButton.addEventListener('click', (e) => {
  toggleEraser()
  if (toggleEraserButton.style.backgroundColor === "rgb(144, 199, 233)") {
    toggleEraserButton.style.backgroundColor = "rgb(92, 161, 204)";
  } else {
    toggleEraserButton.style.backgroundColor = "rgb(144, 199, 233)";
  }
});
