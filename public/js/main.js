const createBtn = document.querySelector('#create');

createBtn.addEventListener('click', sendData);

// Prevent form from submitting
function preventDefault(e) {
  e.preventDefault();
}

document
  .getElementById('mealSubmit')
  .addEventListener('submit', preventDefault, true);

// Handle PUT and POST
async function sendData() {
  // Grab input values from form
  const date = document.querySelector('#date').value;
  const mealType = document.querySelector('#mealType').value;
  const foodItems = document.getElementById('foodItems').value;
  console.log(date, mealType, foodItems);

  const existingEntries = document.querySelectorAll('.entry');
  const existingDays = Array.from(existingEntries);
  console.log(existingDays);

  // Check if date exists - if so, make a PUT request to update, and if not, make a POST request to create
  let httpRequest;
  if (existingDays.some((day) => day.dataset.date === date)) {
    httpRequest = 'put';
  } else {
    httpRequest = 'post';
  }

  try {
    const response = await fetch('/dates', {
      method: httpRequest,
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        date: date,
        mealType: mealType,
        foodItems: foodItems,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

// DELETE

const deleteBtn = document.querySelectorAll('.del');

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener('click', deleteDate);
});

async function deleteDate() {
  const dateId = this.parentNode.parentNode.dataset.id;
  console.log(dateId);
  try {
    const response = await fetch('/dates', {
      method: 'delete',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        dateId: dateId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
