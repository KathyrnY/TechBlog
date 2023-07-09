const submitbtn = document.querySelector('[type=submit]');

const sigunUpForm = async (event) => {
  event.preventDefault();

  const first_name = document.querySelector('#firstname').value.trim();
  const last_name = document.querySelector('#lastname').value.trim();
  const email = document.querySelector('#email').value.trim();
  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#typePassword').value.trim();

  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        first_name,
        last_name,
        email,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

submitbtn.addEventListener('click', sigunUpForm);
