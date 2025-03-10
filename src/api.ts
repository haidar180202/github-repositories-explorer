// src/services/github.ts

import { Repository, User } from "./types";

const BASE_URL = 'https://api.github.com';

// Function to search for users by username
export const searchUsers = async (username: string): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/search/users?q=${username}&per_page=5`);
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }
  const data = await response.json();
  return data.items; // Return the list of users
};

// Function to get repositories for a specific user
export const getUserRepositories = async (username: string): Promise<Repository[]> => {
  const response = await fetch(`${BASE_URL}/users/${username}/repos`);
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }
  const data = await response.json();
  return data; // Return the list of repositories
};
