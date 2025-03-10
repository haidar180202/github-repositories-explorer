import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (username: string) => void; // Function to call when searching
  initialValue?: string; // Initial value for the input
  placeholder?: string; // Placeholder text for the input
  isLoading?: boolean; // Loading state to disable input and button
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  initialValue = '', 
  placeholder = 'Enter username',
  isLoading = false
}) => {
  const [username, setUsername] = useState(initialValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSearch = () => {
    if (username.trim()) {
      onSearch(username);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        value={username}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={isLoading}
      />
      <button onClick={handleSearch} disabled={isLoading} className="search-button">
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
};

export default SearchBar;
