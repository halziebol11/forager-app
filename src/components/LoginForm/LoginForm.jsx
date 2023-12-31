import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

//MUI components
import { Button } from '@mui/material';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <div className="center formPanel">
      <form onSubmit={login} style={{marginLeft:"10px"}}>
      <center>
        <div style={{display:"flex", alignItems:"center"}}>
          <img src="https://www.svgrepo.com/show/190937/acorn.svg"
            height="30px"
            />
          <h2>Login</h2>
        </div>
      </center>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              className='input-box'
              type="password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <br/>
        <center>
          <Button type="submit" variant="outlined" style={{backgroundColor: "#E6CFC1", color: "#484E6B"}}> Log in</Button>
        </center>
        <br/>
      </form>
     </div>
  );
}

export default LoginForm;
