import React, { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

const UserSection: React.FC = () => {
  const {
    user,
    isLoading,
    error,
    logout,
    allUsers,
    fetchUsers,
  } = useAuthStore(state => ({
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    logout: state.logout,
    allUsers: state.allUsers,
    fetchUsers: state.fetchUsers,
  }));

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="user-section p-4">
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      {isLoading ? (
        <p>Loading user details...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Logged In As</h3>
            <p>Username: {user?.username}</p>
            <p>Role: {user?.role}</p>
            <button onClick={handleLogout} className="mt-2 px-3 py-1 bg-red-500 text-white rounded">
              Logout
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">All Users (excluding Admins)</h3>
            {allUsers.length === 0 ? (
              <p>No non-admin users found.</p>
            ) : (
              <ul className="space-y-2">
                {allUsers.map((u, index) => (
                  <li key={index} className="border p-2 rounded shadow-sm">
                    <p><strong>Username:</strong> {u.username}</p>
                    <p><strong>Role:</strong> {u.role}</p>
                    <p><strong>ID:</strong> {u.id}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserSection;
