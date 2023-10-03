import * as githubService from '@/services/github';
import { IGithubRepo } from '@/interfaces/api/github';

jest.mock('@/services/github');
const mockGithubService = githubService as jest.Mocked<typeof githubService>;

describe('getListReposByUsername', () => {
  let username: string;
  let page: number;
  let perPage: number;
  let sort: 'updated';
  let direction: 'asc';

  beforeAll(() => {
    username = 'exampleUser';
    page = 2;
    perPage = 30;
    sort = 'updated';
    direction = 'asc';
  });

  test('fetches GitHub repositories with success reponse', async () => {
    const mockResponse = [
      {
        id: 1,
        nodeId: 'nodeId1',
        name: 'repo1',
        fullName: 'user/repo1',
        owner: {
          login: 'user',
          id: 1001,
          nodeId: 'ownerNodeId1',
          avatarUrl: 'https://example.com/avatar1.png',
          gravatarId: 'gravatarId1',
          url: 'https://api.github.com/users/user',
          htmlUrl: 'https://github.com/user',
          followersUrl: 'https://api.github.com/users/user/followers',
          followingUrl: 'https://api.github.com/users/user/following{/other_user}',
          gistsUrl: 'https://api.github.com/users/user/gists{/gist_id}',
          starredUrl: 'https://api.github.com/users/user/starred{/owner}{/repo}',
          subscriptionsUrl: 'https://api.github.com/users/user/subscriptions',
          organizationsUrl: 'https://api.github.com/users/user/orgs',
          reposUrl: 'https://api.github.com/users/user/repos',
          eventsUrl: 'https://api.github.com/users/user/events{/privacy}',
          receivedEventsUrl: 'https://api.github.com/users/user/received_events',
          type: 'User',
          siteAdmin: false,
        },
        private: false,
        htmlUrl: 'https://github.com/user/repo1',
        description: 'Repository 1 description',
        fork: false,
        url: 'https://api.github.com/repos/user/repo1',
        archiveUrl: 'https://api.github.com/repos/user/repo1/{archive_format}{/ref}',
        assigneesUrl: 'https://api.github.com/repos/user/repo1/assignees{/user}',
      },
      {
        id: 2,
        nodeId: 'nodeId2',
        name: 'repo2',
        fullName: 'user/repo2',
        owner: {
          login: 'user',
          id: 1001,
          nodeId: 'ownerNodeId2',
          avatarUrl: 'https://example.com/avatar2.png',
          gravatarId: 'gravatarId2',
          url: 'https://api.github.com/users/user',
          htmlUrl: 'https://github.com/user',
          followersUrl: 'https://api.github.com/users/user/followers',
          followingUrl: 'https://api.github.com/users/user/following{/other_user}',
          gistsUrl: 'https://api.github.com/users/user/gists{/gist_id}',
          starredUrl: 'https://api.github.com/users/user/starred{/owner}{/repo}',
          subscriptionsUrl: 'https://api.github.com/users/user/subscriptions',
          organizationsUrl: 'https://api.github.com/users/user/orgs',
          reposUrl: 'https://api.github.com/users/user/repos',
          eventsUrl: 'https://api.github.com/users/user/events{/privacy}',
          receivedEventsUrl: 'https://api.github.com/users/user/received_events',
          type: 'User',
          siteAdmin: false,
        },
        private: false,
        htmlUrl: 'https://github.com/user/repo2',
        description: 'Repository 2 description',
        fork: false,
        url: 'https://api.github.com/repos/user/repo2',
        archiveUrl: 'https://api.github.com/repos/user/repo2/{archive_format}{/ref}',
        assigneesUrl: 'https://api.github.com/repos/user/repo2/assignees{/user}',
      },
    ];

    mockGithubService.getListReposByUsername.mockResolvedValue(mockResponse as IGithubRepo[]);

    // Mock the GitHub API request with correct parameters
    const res = await githubService.getListReposByUsername({ username, page, perPage, sort, direction });
    expect(res).toHaveLength(2);
    expect(res[0].id).toEqual(1);
    expect(res).toEqual(mockResponse as IGithubRepo[]);
  });

  test('fetches GitHub repositories with error reponse', () => {
    mockGithubService.getListReposByUsername.mockImplementation(() => {
      throw new Error();
    });

    // Mock the GitHub API request with correct parameters
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(
      async () => await githubService.getListReposByUsername({ username, page, perPage, sort, direction }),
    ).rejects.toThrow();
  });
});
