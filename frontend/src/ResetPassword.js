import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');

  const handleReset = async () => {
    const token = prompt('Enter reset token');

    const res = await axios.post('http://localhost:5000/api/auth/reset-password', {
      token,
      password
    });

    alert(res.data.message);
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2>Reset Password</h2>

      <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} /><br /><br />

      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default ResetPassword;