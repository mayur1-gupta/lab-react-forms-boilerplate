import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const initialingItem = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [Values, setValues] = useState(initialingItem);
  const [Errors, setErrors] = useState({});
  const [Submit, setSubmit] = useState(false);

  const handleEvent = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(Values));
    setSubmit(true);
  };

  useEffect(() => {
    console.log(Errors);
    if (Object.keys(Errors).length === 0 && Submit) {
      console.log(Values);
    }
  }, [Errors, Submit]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexSpecial = /[!@#$%^&*(),.?":{}|<>]/;

    if (!values.name) {
      errors.name = 'Required username!';
    } else if (values.name.length < 3) {
      errors.name = 'Username must have at least 3 characters!';
    } else if (values.name.length > 30) {
      errors.name = 'Username must have less than 30 characters!';
    }

    if (!values.email) {
      errors.email = 'Required Email!';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }

    if (!values.password) {
      errors.password = 'Required Password!';
    } else if (values.password.length < 10) {
      errors.password = 'Password must have more than 10 characters!';
    } else if (!regexSpecial.test(values.password)) {
      errors.password = 'Password must contain at least 1 special character!';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required Confirm Password!';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Confirm Password does not match!';
    }

    return errors;
  };

  return (
    <>
      <div className='form'>
        {Object.keys(Errors).length === 0 && Submit ? (
          <div className='SuccessMessage'>App successful!</div>
        ) : (
          <div className='ErrorMessage'></div>
        )}

        <form onSubmit={handleSubmit}>
          <h1>App Form</h1>
          <div className='userName'>
            <label>Name</label>
            <input
              type='text'
              name='name'
              placeholder='Enter your name...'
              value={Values.name}
              onChange={handleEvent}
            />
          </div>
          <p className='Error'>{Errors.name}</p>

          <div className='userEmail'>
            <label>Email</label>
            <input
              type='text'
              name='email'
              placeholder='Enter your email...'
              value={Values.email}
              onChange={handleEvent}
            />
          </div>
          <p className='Error'>{Errors.email}</p>

          <div className='userPassword'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password...'
              value={Values.password}
              onChange={handleEvent}
            />
          </div>
          <p className='Error'>{Errors.password}</p>

          <div className='ConfirmPassword'>
            <label>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm your password...'
              value={Values.confirmPassword}
              onChange={handleEvent}
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