// Model
const state = {
  count: 10,
};

// Controller
function increaseCount() {
  state.count++;
  renderView();
}

// View

// Update view from Model
function renderView() {
  const countValueText = document.getElementById('count-value');
  countValueText.innerHTML = state.count;
}

const increaseButton = document.getElementById('increase-btn');

// Handle user input
increaseButton.addEventListener('click', function () {
  increaseCount();
});

renderView();
