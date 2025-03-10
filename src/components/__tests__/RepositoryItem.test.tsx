import { render, screen } from '@testing-library/react';
import RepositoryItem from '../RepositoryItem';
import { Repository } from '../../types';

const mockRepository: Repository = {
    id: 1,
    name: 'Repo1',
    description: 'Description1',
    stargazers_count: 5,
    html_url: 'http://example.com', // Adding the repository URL if needed
};

test('renders repository item with correct information', () => {
    render(<RepositoryItem repository={mockRepository} />);
    
    // Check if the repository name is rendered
    expect(screen.getByText('Repo1')).toBeInTheDocument();
    
    // Check if the repository description is rendered
    expect(screen.getByText('Description1')).toBeInTheDocument();
    
    // Check if the star count is rendered
    expect(screen.getByText('5 ★')).toBeInTheDocument();
});

test('renders default description if none is provided', () => {
    const repositoryWithoutDescription: Repository = {
        id: 2,
        name: 'Repo2',
        description: '', // Description is empty
        stargazers_count: 3,
        html_url: 'http://example.com',
    };

    render(<RepositoryItem repository={repositoryWithoutDescription} />);
    
    // Check if the default description is rendered
    expect(screen.getByText('No description available')).toBeInTheDocument();
});
