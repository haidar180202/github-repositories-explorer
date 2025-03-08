// src/services/github.ts

import { Repository, User } from "./types";



const BASE_URL = 'https://api.github.com';

export const searchUsers = async (username: string): Promise<User[]> => {
  if (!username.trim()) {
    return [];
  }

  try {
    const response = await fetch(`${BASE_URL}/search/users?q=${username}&per_page=5`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.items as User[];
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

export const getUserRepositories = async (username: string): Promise<Repository[]> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}/repos?sort=updated`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return await response.json() as Repository[];
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};