import { IGetGithubReposParams, IGithubRepo } from '@/interfaces/api/github';
import createAxiosInstance from '@/services/http-client';
import { snakeCaseKeys } from '@/utils/convert';

const API_PATH = 'https://api.github.com';

const apiClient = createAxiosInstance({
  baseURL: API_PATH,
  headers: {
    Accept: 'application/vnd.github+json',
  },
});

export const getListReposByUsername = async (params: IGetGithubReposParams) => {
  try {
    // Destructure the params
    const { username, page = 1, perPage = 20, sort = 'updated_at', direction = 'desc' } = params;

    // Make the request to the GitHub API
    const response = await apiClient.get(`/users/${username}/repos`, {
      // Adjusting the parameter name based on the interface
      params: snakeCaseKeys({
        page,
        perPage,
        sort,
        direction,
      }),
    });

    // Convert to Array<IGithubRepo>
    const repos: Array<IGithubRepo> = response.data as Array<IGithubRepo>;
    return repos;
  } catch (error) {
    // Handle errors here, e.g., log the error, show a user-friendly message, etc.
    console.error('Error fetching GitHub repositories:', error);
    // Rethrow the error for the calling code to handle
    throw error;
  }
};
