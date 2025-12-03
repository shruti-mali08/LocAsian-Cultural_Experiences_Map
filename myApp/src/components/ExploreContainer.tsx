import React, { useEffect, useState } from 'react';
import './ExploreContainer.css';

interface User {
  user_id: number;
  username: string;
  created_at: string;
}

const ExploreContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:8080/users');
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const data = await res.json();
        console.log('Backend response:', data);
        setUsers(data);
      } catch (err: any) {
        console.error('Error calling backend:', err);
        setError(err.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div id="container">
      <h2>Users from backend</h2>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && (
        users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul>
            {users.map((u) => (
              <li key={u.user_id}>
                {u.username} – {new Date(u.created_at).toLocaleString()}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default ExploreContainer;
