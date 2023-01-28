const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span')
const errorDiv = document.getElementById('error-div')

const completeEl = document.getElementById('complete')
const completeElInfo = document.getElementById('complete-info')
const completeBtn = document.getElementById('complete-button')

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date;
let countdownActive
let savedCountdown;

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

// Set Date Input Minimum with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today)

// Event Listener

countdownForm.addEventListener('submit', updateCountdown);

function updateCountdown(e) {
  e.preventDefault()
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = { title: countdownTitle, date: countdownDate }
  localStorage.setItem('countdown', JSON.stringify(savedCountdown))

  if (countdownDate === '') {

    errorDiv.hidden = false
  } else {
    errorDiv.hidden = true
    // Get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime()
    updateDOM()
  }
}

// Populate Countdown
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime()
    const distance = countdownValue - now;

    const days = Math.floor(distance / day)
    const hours = Math.floor((distance % day) / hour)
    const minutes = Math.floor((distance % hour) / minute)
    const seconds = Math.floor((distance % minute) / second)

    // Hide Input
    inputContainer.hidden = true

    // If the countdown has ended, show complete
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
      completeEl.hidden = false
    } else {
      // show the countdown in progress:
      // Populate Countdown Values
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`
      timeElements[1].textContent = `${hours}`
      timeElements[2].textContent = `${minutes}`
      timeElements[3].textContent = `${seconds}`
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }

  }, second)
}

countdownBtn.addEventListener('click', reset)

function reset() {
  // Hide Countdowns, show Input
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;

  // Stop the countdown
  clearInterval(countdownActive);

  // Reset Form values
  countdownTitle = ''
  countdownDate = ''
  localStorage.removeItem('countdown')
}

function restorePreviousCountdown() {
  // Get countdown from Local Storage if available
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'))
    countdownTitle = savedCountdown.title
    countdownDate = savedCountdown.date
    countdownValue = new Date(countdownDate).getTime()
    updateDOM()
  }
}

completeBtn.addEventListener('click', reset)

// On load check local storage
restorePreviousCountdown()