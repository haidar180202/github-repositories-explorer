// src/components/SearchBar.tsx

import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (username: string) => void;
  initialValue?: string;
  placeholder?: string;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  initialValue = '', 
  placeholder = 'Enter username',
  isLoading = false
}) => {
  const [username, setUsername] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(username);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(username);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      <button 
        className="search-button"
        onClick={handleSubmit}
        disabled={isLoading || !username.trim()}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;