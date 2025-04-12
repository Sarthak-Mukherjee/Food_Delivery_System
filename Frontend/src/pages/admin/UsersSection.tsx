// UserSection.tsx
import React, { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore'; // Store for managing users

const UserSection: React.FC = () => {
  const { user, isLoading, error, logout } = useAuthStore(state => ({
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    logout: state.logout,
  }));

  const handleLogout = () => {
    logout(); // Logout the user
  };

  useEffect(() => {
    // Fetch user data or perform admin checks here if needed
  }, []);

  return (
    <div className="user-section">
      <h2>User Management</h2>
      {isLoading ? (
        <p>Loading user details...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <h3>User Details</h3>
          <p>Username: {user?.username}</p>
          <p>Role: {user?.role}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default UserSection;
