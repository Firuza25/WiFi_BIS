import React from 'react';

const Account = ({ user }) => {
  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>This is your account page.</p>
    </div>
  );
};

export default Account;
