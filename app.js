// app.js
import { database, ref, set, get, child } from './firebase-config.js';

// Foydalanuvchi yozish (misol uchun)
function saveUser(name, surname) {
  set(ref(database, 'users/' + name + '_' + surname), {
    firstName: name,
    lastName: surname
  })
  .then(() => {
    alert('Maʼlumot saqlandi!');
  })
  .catch((error) => {
    console.error('Xatolik:', error);
  });
}

// DOM bilan ishlash
document.getElementById('submit-user-info').addEventListener('click', () => {
  const name = document.getElementById('first-name').value.trim();
  const surname = document.getElementById('last-name').value.trim();
  if (name && surname) {
    saveUser(name, surname);
    // boshqa UI funksiyalar...
  }
});
