import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      name,
      email,
      password
    });

    alert(res.data.message);
    window.location.href = '/';
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} /><br /><br />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
      <input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br /><br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;