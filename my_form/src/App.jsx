import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const initialingItem = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [users, setusers] = useState(initialingItem);
  const [Errors, setErrors] = useState({});
  const [Submit, setSubmit] = useState(false);

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setusers({ ...users, [name]: value });
  };

  const handleSubmitChange = (e) => {
    e.preventDefault();
    setErrors(validation(users));
    setSubmit(true);
  };

  useEffect(() => {
    console.log(Errors);
    if (Object.keys(Errors).length === 0 && Submit) {
      console.log(users);
    }
  }, [Errors, Submit]);

  const validation = (users) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexSpecial = /[!@#$%^&*(),.?":{}|<>]/;

    if (!users.name) {
      errors.name = 'Required username!';
    } else if (users.name.length < 3) {
      errors.name = 'Username must have at least 3 characters!';
    } else if (users.name.length > 30) {
      errors.name = 'Username must have less than 30 characters!';
    }

    if (!users.email) {
      errors.email = 'Required Email!';
    } else if (!regex.test(users.email)) {
      errors.email = 'This is not a valid email format!';
    }

    if (!users.password) {
      errors.password = 'Required Password!';
    } else if (users.password.length < 10) {
      errors.password = 'Password must have more than 10 characters!';
    } else if (!regexSpecial.test(users.password)) {
      errors.password = 'Password must contain at least 1 special character!';
    }

    if (!users.confirmPassword) {
      errors.confirmPassword = 'Required Confirm Password!';
    } else if (users.confirmPassword !== users.password) {
      errors.confirmPassword = 'Confirm Password does not match!';
    }

    return errors;
  };

  return (
    <>
      <div className='Form'>
        {Object.keys(Errors).length === 0 && Submit ? (
          <div className='SuccessMessage'>App successful!</div>
        ) : (
          <div className='ErrorMessage'></div>
        )}

        <form onSubmit={handleSubmitChange}>
          <h1>App Form</h1>
          <div className='userName'>
            <label>Name</label>
            <input
              type='text'
              name='name'
              placeholder='Enter your name...'
              value={users.name}
              onChange={handleEventChange}
            />
          </div>
          <p className='Error'>{Errors.name}</p>

          <div className='userEmail'>
            <label>Email</label>
            <input
              type='text'
              name='email'
              placeholder='Enter your email...'
              value={users.email}
              onChange={handleEventChange}
            />
          </div>
          <p className='Error'>{Errors.email}</p>

          <div className='userPassword'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password...'
              value={users.password}
              onChange={handleEventChange}
            />
          </div>
          <p className='Error'>{Errors.password}</p>

          <div className='ConfirmPassword'>
            <label>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm your password...'
              value={users.confirmPassword}
              onChange={handleEventChange}
            />
          </div>
          <p  className='Error'>{Errors.confirmPassword}</p>

          <button className='btn' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;