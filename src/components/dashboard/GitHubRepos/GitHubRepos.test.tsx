import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GitHubRepos from '@/components/dashboard/GitHubRepos';
import { getListReposByUsername } from '@/services/github';
import { IGithubRepo } from '@/interfaces/api/github';

// Mock the service function
jest.mock('@/services/github', () => ({
  getListReposByUsername: jest.fn(),
}));

const mockRepos = [
  {
    id: 1,
    name: 'Test Repo 1',
    htmlUrl: 'https://github.com/testuser/test-repo-1',
    createdAt: '2022-01-01T12:00:00Z',
    language: 'JavaScript',
    description: 'Test description 1',
  },
] as IGithubRepo[];

describe('GitHubRepos', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (getListReposByUsername as jest.Mock).mockReset();
  });

  test('should fetch and display repositories on button click', async () => {
    // Mock the service response
    (getListReposByUsername as jest.Mock).mockResolvedValueOnce(mockRepos);

    render(<GitHubRepos />);

    // Fill in the username input
    const usernameInput = screen.getByPlaceholderText('Enter your Github username');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });

    // Click the "Load repos" button
    fireEvent.click(screen.getByText('Load repos'));

    // Wait for the API call to complete
    await waitFor(() => {
      expect(getListReposByUsername).toHaveBeenCalledWith({ username: 'testuser', page: 1 });
    });

    // Verify that the repositories are rendered
    expect(screen.getByText('Test Repo 1')).toBeInTheDocument();
  });
});
