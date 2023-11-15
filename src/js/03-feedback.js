import '../css/common.css';
import '../css/03-feedback.css';
import throttle from 'lodash.throttle';

const LOCAL_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onInputData, 500));
form.addEventListener('submit', onFormSubmit);

let dataForm = {};

function onInputData(e) {
  dataForm[e.target.name] = e.target.value.trim();
  localStorage.setItem(LOCAL_KEY, JSON.stringify(dataForm));
}

function refreshForm() {
  try {
    const savedData = localStorage.getItem(LOCAL_KEY);
    if (!savedData) return;
    dataForm = JSON.parse(savedData);
    Object.entries(dataForm).forEach(([key, val]) => {
      form.elements[key].value = val;
    });
  } catch ({ message }) {
    console.log(message);
  }
}
refreshForm();

function onFormSubmit(e) {
  e.preventDefault();
  localStorage.removeItem(LOCAL_KEY);
  e.currentTarget.reset();
  dataForm = {};
}
