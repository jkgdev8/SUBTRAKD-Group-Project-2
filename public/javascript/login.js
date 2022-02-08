// login
async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  

  if (email && password) {
    const response = await fetch('/api/user/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      saveToLocalStorage(email);
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

// log out
async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/user', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      saveToLocalStorage(email);
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

const saveToLocalStorage = (email)=>{
  localStorage.setItem('email', email)
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
