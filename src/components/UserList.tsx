import React, { ReactNode } from 'react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  searchTerm: string;
  selectedUsername: string | null;
  onSelectUser: (username: string) => void;
  children?: ReactNode; // Add children prop
}

const UserList: React.FC<UserListProps> = ({
  users,
  searchTerm,
  selectedUsername,
  onSelectUser,
  children // Destructure children from props
}) => {
  if (!searchTerm || users.length === 0) {
    return null;
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        Showing users for "{searchTerm}"
      </div>
      <div className="user-list">
        {users.map(user => (
          <>
            <div
              key={user.id}
              className={`user-item ${selectedUsername === user.login ? 'selected' : ''}`}
              onClick={() => onSelectUser(user.login)}
            >
              {user.login}
              <span className="dropdown-icon">{selectedUsername === user.login ? '▲' : '▼'}</span>
            </div>

            {/* Render children below the user list */}
            {selectedUsername === user.login && (
              <div className="children-container">
                {children}
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default UserList;
