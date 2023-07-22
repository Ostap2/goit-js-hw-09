import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      window.alert("Please choose a date in the future");
      document.querySelector("[data-start]").disabled = true;
    } else {
      document.querySelector("[data-start]").disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

let timerInterval;

document.querySelector("[data-start]").addEventListener("click", () => {
  const selectedDate = new Date(document.querySelector("#datetime-picker").value).getTime();
  const currentDate = new Date().getTime();
  const timeDifference = selectedDate - currentDate;

  if (timeDifference <= 0) {
    window.alert("Please choose a date in the future");
    return;
  }

  document.querySelector("[data-start]").disabled = true;
  document.querySelector("#datetime-picker").disabled = true;

  updateTimerDisplay(timeDifference);

  timerInterval = setInterval(() => {
    const updatedTimeDifference = selectedDate - new Date().getTime();
    if (updatedTimeDifference <= 0) {
      clearInterval(timerInterval);
      updateTimerDisplay(0);
      document.querySelector("[data-start]").disabled = false;
      document.querySelector("#datetime-picker").disabled = false;
    } else {
      updateTimerDisplay(updatedTimeDifference);
    }
  }, 1000);
});

function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
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

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}
