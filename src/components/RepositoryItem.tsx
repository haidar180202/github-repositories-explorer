import React from 'react';
import { Repository } from '../types';

interface RepositoryItemProps {
  repository: Repository;
}

const RepositoryItem: React.FC<RepositoryItemProps> = ({ repository }) => {
  return (
    <div className="repository-item">
      <div className="repository-header">
        <h3 className="repository-title">{repository.name}</h3>
        <div className="star-count">
          {repository.stargazers_count} ★
        </div>
      </div>
      <p className="repository-description">
        {repository.description || 'No description available'}
      </p>
    </div>
  );
};

export default RepositoryItem;
