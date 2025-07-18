import React, { useState } from 'react'
import FormInput from './formInput'
import CustomButton from './customButton'
//import { auth, createUserProfileDocument } from '../firebase/firebase'
//import { createUserWithEmailAndPassword } from 'firebase/auth';
import { connect } from 'react-redux';
import { signUpStart } from '../redux/user/user.actions';



const SignUp = ({ signUpStart, }) => {

  const [userCredentials, setCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();


    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (!displayName || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    signUpStart({ displayName, email, password });
  };


  const handleChange = event => {
    const { name, value } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };


  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          label='Confirm Password'
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
