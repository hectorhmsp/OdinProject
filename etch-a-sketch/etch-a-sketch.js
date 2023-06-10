const jsGrid = document.querySelector('.js-grid');

function createGrids(number) {
  return ('<div class="grid-item"></div>').repeat(number * number);
}

const DEFAULT_SIZE = 16;
let currentSize = DEFAULT_SIZE;
let currentColor = 'black';
let isMouseDown = false;

const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');

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
colorPicker.addEventListener('input', (event) => {
  setCurrentColor(event.target.value);
});

function setupGrid(size) {
  jsGrid.innerHTML = createGrids(size);

  jsGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  jsGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  const gridItems = document.querySelectorAll('.grid-item');
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
}

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
};
