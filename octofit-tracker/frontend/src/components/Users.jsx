import { useEffect, useState } from 'react';
import { normalizeArrayResponse } from '../config/api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const usersApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/search/test`
  : 'http://localhost:8000/api/users/search/test';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(usersApiUrl);
        if (!response.ok) {
          throw new Error('Unable to load users.');
        }

        const payload = await response.json();
        const data = normalizeArrayResponse(payload, []);
        setUsers(data);
        setError('');
      } catch (err) {
        setError(err.message || 'Unable to load users.');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Users</h2>
            {loading ? (
              <p className="text-muted">Loading users...</p>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : users.length === 0 ? (
              <p className="text-muted">No users found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => {
                      const key = user?._id || user?.id || `${user?.username || 'user'}-${index}`;
                      const profile = user?.profile || {};

                      return (
                        <tr key={key}>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>
                            {profile.firstName || profile.lastName
                              ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim()
                              : 'No profile'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
