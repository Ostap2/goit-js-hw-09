
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      alert("Please choose a date in the future");
      document.querySelector("[data-start]").disabled = true;
    } else {
      document.querySelector("[data-start]").disabled = false;
    }
  },
};

const dateTimePicker = flatpickr("#datetime-picker", options);

let countdownInterval;

function startTimer() {
  const selectedDate = dateTimePicker.selectedDates[0];
  const currentDate = new Date();
  if (selectedDate > currentDate) {
    countdownInterval = setInterval(updateTimer, 1000, selectedDate);
    updateTimer(selectedDate);
  } else {
    alert("Please choose a date in the future");
  }
}

function updateTimer(selectedDate) {
  const currentDate = new Date();
  const remainingTime = selectedDate - currentDate;
  const { days, hours, minutes, seconds } = convertMs(remainingTime);
  renderTimer({ days, hours, minutes, seconds });

  if (remainingTime <= 0) {
    clearInterval(countdownInterval);
    document.querySelector("[data-start]").disabled = true;
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

function renderTimer({ days, hours, minutes, seconds }) {
  document.querySelector("[data-days]").textContent = addLeadingZero(days);
  document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
  document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
  document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
}

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

document.querySelector("[data-start]").addEventListener("click", startTimer);
