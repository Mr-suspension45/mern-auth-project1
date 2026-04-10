import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    const res = await axios.post('http://localhost:5000/api/auth/forgot-password', {
      email
    });

    alert(res.data.message);
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2>Forgot Password</h2>

      <input placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ForgotPassword;