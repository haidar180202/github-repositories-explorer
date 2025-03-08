// src/components/RepositoryList.tsx

import React from 'react';
import { Repository } from '../types';

interface RepositoryListProps {
  repositories: Repository[];
  username: string;
  isLoading: boolean;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ 
  repositories, 
  isLoading 
}) => {
  if (isLoading) {
    return <div className="loading">Loading repositories...</div>;
  }

  if (repositories.length === 0) {
    return <div className="no-repositories">No repositories found</div>;
  }

  return (
    <div className="repository-list">
      {repositories.map(repo => (
        <div key={repo.id} className="repository-item">
          <div className="repository-header">
            <span className="repository-title">{repo.name}</span>
            <span className="star-count">{repo.stargazers_count} ★</span>
          </div>
          <p className="repository-description">
            {repo.description || 'Repository description'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;