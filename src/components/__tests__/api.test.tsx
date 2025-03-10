// src/services/__tests__/api.test.tsx

import { searchUsers, getUserRepositories } from '../../api';

// Mock the fetch function
global.fetch = jest.fn();

describe('GitHub API Functions', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test('searchUsers returns user data', async () => {
    const mockResponse = {
      items: [
        { id: 1, login: 'haidar' },
        { id: 2, login: 'mhaidar' },
      ],
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const users = await searchUsers('haidar');
    expect(users).toEqual(mockResponse.items);
    expect(fetch).toHaveBeenCalledWith('https://api.github.com/search/users?q=haidar&per_page=5');
  });

  test('searchUsers handles errors', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    });

    await expect(searchUsers('haidar')).rejects.toThrow('GitHub API error: Not Found');
  });

  test('getUserRepositories returns repository data', async () => {
    const mockRepos = [
      { id: 1, name: 'Repo1', description: 'Description1', stargazers_count: 5, html_url: 'http://example.com' },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockRepos),
    });

    const repos = await getUserRepositories('haidar');
    expect(repos).toEqual(mockRepos);
    expect(fetch).toHaveBeenCalledWith('https://api.github.com/users/haidar/repos');
  });

  test('getUserRepositories handles errors', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    });

    await expect(getUserRepositories('haidar')).rejects.toThrow('GitHub API error: Not Found');
  });
});
