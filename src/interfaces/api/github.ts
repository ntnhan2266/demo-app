export interface IGetGithubReposParams {
  username: string;
  page?: number;
  perPage?: number;
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
}

export interface IGithubRepo {
  id: number;
  nodeId: string;
  name: string;
  fullName: string;
  owner: {
    login: string;
    id: number;
    nodeId: string;
    avatarUrl: string;
    gravatarId: string;
    url: string;
    htmlUrl: string;
    followersUrl: string;
    followingUrl: string;
    gistsUrl: string;
    starredUrl: string;
    subscriptionsUrl: string;
    organizationsUrl: string;
    reposUrl: string;
    eventsUrl: string;
    receivedEventsUrl: string;
    type: string;
    siteAdmin: boolean;
  };
  private: boolean;
  htmlUrl: string;
  description: string;
  fork: boolean;
  url: string;
  archiveUrl: string;
  assigneesUrl: string;
  blobsUrl: string;
  branchesUrl: string;
  collaboratorsUrl: string;
  commentsUrl: string;
  commitsUrl: string;
  compareUrl: string;
  contentsUrl: string;
  contributorsUrl: string;
  deploymentsUrl: string;
  downloadsUrl: string;
  eventsUrl: string;
  forksUrl: string;
  gitCommitsUrl: string;
  gitRefsUrl: string;
  gitTagsUrl: string;
  gitUrl: string;
  issueCommentUrl: string;
  issueEventsUrl: string;
  issuesUrl: string;
  keysUrl: string;
  labelsUrl: string;
  languagesUrl: string;
  mergesUrl: string;
  milestonesUrl: string;
  notificationsUrl: string;
  pullsUrl: string;
  releasesUrl: string;
  sshUrl: string;
  stargazersUrl: string;
  statusesUrl: string;
  subscribersUrl: string;
  subscriptionUrl: string;
  tagsUrl: string;
  teamsUrl: string;
  treesUrl: string;
  cloneUrl: string;
  mirrorUrl: string;
  hooksUrl: string;
  svnUrl: string;
  homepage: string;
  language: string | null;
  forksCount: number;
  stargazersCount: number;
  watchersCount: number;
  size: number;
  defaultBranch: string;
  openIssuesCount: number;
  isTemplate: boolean;
  topics: string[];
  hasIssues: boolean;
  hasProjects: boolean;
  hasWiki: boolean;
  hasPages: boolean;
  hasDownloads: boolean;
  hasDiscussions: boolean;
  archived: boolean;
  disabled: boolean;
  visibility: string;
  pushedAt: string;
  createdAt: string;
  updatedAt: string;
  permissions: {
    admin: boolean;
    push: boolean;
    pull: boolean;
  };
  securityAndAnalysis: {
    advancedSecurity: {
      status: string;
    };
    secretScanning: {
      status: string;
    };
    secretScanningPushProtection: {
      status: string;
    };
  };
}
