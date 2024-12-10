function toggleForm(formType) {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    if (formType === 'signup') {
      signupForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
    } else {
      signupForm.classList.add('hidden');
      loginForm.classList.remove('hidden');
    }
  }

  function register() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const profilePicture = document.getElementById('uploadImage').files[0];

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
      alert('Email already registered! Use a different email.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      const newUser = {
        name,
        email,
        password,
        profilePicture: reader.result,
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      alert('Registration successful!');
      toggleForm('login');
    };

    if (profilePicture) {
      reader.readAsDataURL(profilePicture);
    } else {
      alert('Please upload a profile picture!');
    }
  }

  function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      alert(`Welcome back, ${user.name}!`);
    } else {
      alert('Invalid email or password!');
    }
  }