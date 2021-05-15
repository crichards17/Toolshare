const loginFormHandler = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#email').value.trim();
    const user_name = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const user_address = document.querySelector('#address').value.trim();
  
    if (email && username && password && address) {
      const response = await fetch('/api/UsersLogin/create', {
        method: 'POST',
        body: JSON.stringify({ email, user_name, password, user_address }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create account');
      }
    }
  };
  
  document
    .querySelector('#sign_up')
    .addEventListener('click', loginFormHandler);