import React, { useState, useEffect } from 'react';

function App() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setUserData(data);
        setError('');
      } catch (err) {
        setUserData(null);
        setError(err.message);
      }
    };

    fetchUserData();
  }, [userId]);  // This effect runs every time `userId` changes.

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h1>FastAPI User Fetch</h1>
      <input
        type="text"
        placeholder="Enter user ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ padding: '8px', marginBottom: '10px' }}
      />
      <br />

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData && (
        <div style={{ marginTop: '20px' }}>
          <p>User ID: {userData.user_id}</p>
          <p>{userData.message}</p>
        </div>
      )}
    </div>
  );
}

export default App;
