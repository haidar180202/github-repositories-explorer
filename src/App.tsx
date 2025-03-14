import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import RepositoryList from './components/RepositoryList';
import { User, Repository } from './types';
import { getUserRepositories, searchUsers } from './api';

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [isLoadingRepos, setIsLoadingRepos] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (username: string) => {
        setSearchTerm(username);
        setSelectedUsername(null);
        setRepositories([]);
        setError(null);

        if (!username.trim()) {
            setUsers([]);
            return;
        }

        setIsLoadingUsers(true);

        try {
            const results = await searchUsers(username);
            setUsers(results);
        } catch (err) {
            setError('Failed to search users. Please try again.');
            setUsers([]);
        } finally {
            setIsLoadingUsers(false);
        }
    };

    const handleSelectUser = async (username: string) => {
        if (selectedUsername === username) {
            // Toggle off if clicking the same user
            setSelectedUsername(null);
            setRepositories([]);
            return;
        }

        setSelectedUsername(username);
        setRepositories([]);
        setError(null);
        setIsLoadingRepos(true);

        try {
            const repos = await getUserRepositories(username);
            setRepositories(repos);
        } catch (err) {
            setError(`Failed to load repositories for ${username}.`);
        } finally {
            setIsLoadingRepos(false);
        }
    };

    return (
        <div className="app-container">
            <div className="frames-container">
                <div className="frame">
                    <SearchBar
                        onSearch={handleSearch}
                        initialValue={searchTerm}
                        isLoading={isLoadingUsers}
                    />

                    {error && <div className="error-message">{error}</div>}

                    <UserList
                        users={users}
                        searchTerm={searchTerm}
                        selectedUsername={selectedUsername}
                        onSelectUser={handleSelectUser}
                    >
                        {selectedUsername && (
                            <div className="repo-view">
                                <RepositoryList
                                    repositories={repositories}
                                    username={selectedUsername}
                                    isLoading={isLoadingRepos}
                                />
                            </div>
                        )}
                    </UserList>
                </div>
            </div>
        </div>
    );
};

export default App;
