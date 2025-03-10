import React from 'react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  searchTerm: string;
  selectedUsername: string | null;
  onSelectUser: (username: string) => void;
  children?: React.ReactNode; // Add children prop
}

const UserList: React.FC<UserListProps> = ({
  users,
  searchTerm,
  selectedUsername,
  onSelectUser,
  children // Destructure children from props
}) => {
  // If there is no search term or no users, return null
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
          <div key={user.id} > {/* Add key prop here */}
            <div
              style={{marginBottom:"20px"}}
              onClick={() => onSelectUser(user.login)}
            >
              <div className={`user-item ${selectedUsername === user.login ? 'selected' : ''}`} style={{ backgroundColor: "rgb(230 220 220)", paddingBottom: "10px" }}>
                {user.login}
                <span className="dropdown-icon">{selectedUsername === user.login ? '▲' : '▼'}</span>
              </div>
            </div>

            {selectedUsername === user.login && (
              <div className="children-container">
                {children}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
