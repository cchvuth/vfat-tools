function login() {
  const password = document.getElementById('password').value
  fetch('http://staging.creditvine.com/api/proxy/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({password}),
  }).then(res => {
    if (res.status === 401) alert('Wrong Password')
    else {
      localStorage.setItem('u', password)
      window.location.href = '/'
    }
  })
}
