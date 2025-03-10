import React from 'react';
import { Repository } from '../types';

interface RepositoryListProps {
  repositories: Repository[];
  username: string;
  isLoading: boolean;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ 
  repositories, 
  username, 
  isLoading 
}) => {
  if (isLoading) {
    return <div className="loading">Loading repositories...</div>;
  }

  if (repositories.length === 0) {
    return <div className="no-repositories">No repositories found for {username}.</div>;
  }

  return (
    <div className="repository-list">
      {repositories.map(repo => (
        <div key={repo.id} className="repository-item">
          <div className="repository-header">
            <h3 className="repository-title">{repo.name}</h3>
            <div className="star-count">
              {repo.stargazers_count} ★
            </div>
          </div>
          <p className="repository-description">
            {repo.description || 'No description available'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;
