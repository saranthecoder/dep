import React from 'react';
import './Signup.css'; 
import { Assets } from '../../utils/assets';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="form-container">
      <div className="header">
        <img
          src={Assets.logo}
          alt="Web Plus Academy"
          className="logo"
        />
      </div>
      <form className="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="enter your email id" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="enter your password"
          />
        </div>
        <button type="submit" className="submit-btn">
          SUBMIT
        </button>
      </form>
      <div className="footer">
        <span>Already have an account?</span>
        <Link to="/login" className="register-link">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
