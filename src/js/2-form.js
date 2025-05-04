const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;
const STORAGE_KEY = 'feedback-form-state';

// Об'єкт з початковими порожніми значеннями
let formData = {
  email: '',
  message: ''
};

// Завантаження збережених даних при старті
loadFormData();

// Відстеження змін у формі
form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// Обробка відправлення форми
form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});

// Заповнення форми з локального сховища
function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;

  try {
    const parsedData = JSON.parse(savedData);
    formData = {
      email: parsedData.email || '',
      message: parsedData.message || ''
    };

    emailInput.value = formData.email;
    messageInput.value = formData.message;
  } catch (error) {
    console.error('Error loading form data from localStorage:', error);
  }
}
