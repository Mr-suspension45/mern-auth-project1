import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      alert(res.data.message);

      // ✅ SAVE TOKEN
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);

        // ✅ REDIRECT TO DASHBOARD
        window.location.href = '/dashboard';
      }

    } catch (error) {
      alert('Login failed ❌');
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      {/* ✅ REMEMBER ME */}
      <label>
        <input type="checkbox" /> Remember Me
      </label><br /><br />

      <button onClick={handleLogin}>Login</button><br /><br />

      {/* ✅ LINKS */}
      <a href="/forgot">Forgot Password?</a><br />
      <a href="/register">Create Account</a>
    </div>
  );
}

export default Login;