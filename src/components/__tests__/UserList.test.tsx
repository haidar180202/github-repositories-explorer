import { render, screen, fireEvent } from '@testing-library/react';
import UserList from '../UserList';
import { User } from '../../types';

const mockUsers: User[] = [
  { id: 1, login: 'haidar', avatar_url: 'http://example.com/avatar1.png' },
  { id: 2, login: 'mhaidar', avatar_url: 'http://example.com/avatar2.png' },
];

describe('UserList Component', () => {
  test('renders user list with provided users', () => {
    render(
      <UserList 
        users={mockUsers} 
        searchTerm="haidar" 
        selectedUsername={null} 
        onSelectUser={() => {}} 
      />
    );

    // Check if user names are rendered
    expect(screen.getByText('haidar')).toBeInTheDocument();
    expect(screen.getByText('mhaidar')).toBeInTheDocument();
  });

  test('does not render when there is no search term or users', () => {
    const { container } = render(
      <UserList 
        users={[]} 
        searchTerm="" 
        selectedUsername={null} 
        onSelectUser={() => {}} 
      />
    );

    // Check that nothing is rendered
    expect(container).toBeEmptyDOMElement();
  });

  test('calls onSelectUser when a user is clicked', () => {
    const handleSelectUser = jest.fn();
    render(
      <UserList 
        users={mockUsers} 
        searchTerm="haidar" 
        selectedUsername={null} 
        onSelectUser={handleSelectUser} 
      />
    );

    // Simulate clicking on the first user
    fireEvent.click(screen.getByText('haidar'));
    expect(handleSelectUser).toHaveBeenCalledWith('haidar');
  });

  test('renders children correctly', () => {
    render(
      <UserList 
        users={mockUsers} 
        searchTerm="haidar" 
        selectedUsername="haidar" 
        onSelectUser={() => {}} 
      >
        <div>Child Component</div>
      </UserList>
    );

    // Check if the child component is rendered
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });
});
