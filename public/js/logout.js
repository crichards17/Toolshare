const logout = async () => {
    console.log('out')
    const response = await fetch('/api/UsersLogin/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/api/UsersLogin/login');
    } else {
      alert(response.statusText);
    }
  };
  $(window).unload(logout())
  document.querySelector('#logout').addEventListener('click', logout);