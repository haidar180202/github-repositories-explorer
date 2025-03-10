import { render, screen } from '@testing-library/react';
import RepositoryList from '../RepositoryList';
import { Repository } from '../../types';

const mockRepositories: Repository[] = [
  {
    id: 1,
    name: 'Repo1',
    description: 'Description1',
    stargazers_count: 5,
    html_url: 'http://example.com/repo1',
  },
  {
    id: 2,
    name: 'Repo2',
    description: 'Description2',
    stargazers_count: 3,
    html_url: 'http://example.com/repo2',
  },
];

describe('RepositoryList Component', () => {
  test('renders loading state', () => {
    render(<RepositoryList repositories={[]} username="haidar" isLoading={true} />);
    expect(screen.getByText('Loading repositories...')).toBeInTheDocument();
  });

  test('renders no repositories message', () => {
    render(<RepositoryList repositories={[]} username="haidar" isLoading={false} />);
    expect(screen.getByText('No repositories found for haidar.')).toBeInTheDocument();
  });

  test('renders list of repositories', () => {
    render(<RepositoryList repositories={mockRepositories} username="haidar" isLoading={false} />);
    
    // Check if repository names are rendered
    expect(screen.getByText('Repo1')).toBeInTheDocument();
    expect(screen.getByText('Description1')).toBeInTheDocument();
    expect(screen.getByText('5 ★')).toBeInTheDocument();
    
    expect(screen.getByText('Repo2')).toBeInTheDocument();
    expect(screen.getByText('Description2')).toBeInTheDocument();
    expect(screen.getByText('3 ★')).toBeInTheDocument();
  });
});
