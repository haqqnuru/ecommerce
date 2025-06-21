import React, { Component, useState } from 'react'
import { connect } from 'react-redux';
import FormInput from './formInput';
import CustomButton from './customButton';
import { googleSignInStart, emailSignInStart } from '../redux/user/user.actions';



const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const { email, password } = userCredentials;


  const handleSubmit = async event => {
    event.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    emailSignInStart(email, password);
  };


  const handleChange = event => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with you email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput
          id="email"
          name="email"
          type="email"
          value={email}
          required
          handleChange={handleChange}
          label="Email"
        />


        <FormInput
          id="password"
          name="password"
          type="password"
          value={password}
          required
          handleChange={handleChange}
          label="Password"
        />

        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton type="button"
            onClick={googleSignInStart} isGoogleSignIn>
            Sign In With Google</CustomButton>
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

export default connect(
  null,
  mapDispatchToProps
)(SignIn);