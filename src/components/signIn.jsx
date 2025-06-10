import React, { Component } from 'react'
import { connect } from 'react-redux';
import FormInput from './formInput';
import CustomButton from './customButton';
import { googleSignInStart, emailSignInStart } from '../redux/user/user.actions';



class SignIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: ""
    }
  }


  handleSubmit = async event => {
    event.preventDefault();
    const { emailSignInStart } = this.props;
    const { email, password } = this.state;

    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    emailSignInStart(email, password);
  };


  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value })
  };

  render() {

    const { googleSignInStart } = this.props;
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with you email and password</span>
        <form onSubmit={this.handleSubmit}>

          <FormInput
            id="email"
            name="email"
            type="email"
            value={this.state.email}
            required
            handleChange={this.handleChange}
            label="Email"
          />


          <FormInput
            id="password"
            name="password"
            type="password"
            value={this.state.password}
            required
            handleChange={this.handleChange}
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