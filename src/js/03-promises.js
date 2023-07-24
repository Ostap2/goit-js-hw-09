import {Notiflix} from "notiflix"


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.querySelector('.form').addEventListener('submit', (event) => {
  event.preventDefault();
  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');
  
  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    createPromise(position, delay).then(({ position, delay }) => {
      Notiflix.Notify.Success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }).catch(({ position, delay }) => {
      Notiflix.Notify.Failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay += step; 
  }
});
