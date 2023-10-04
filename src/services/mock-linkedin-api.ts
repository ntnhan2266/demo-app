// This file provides a mock implementation of the LinkedIn API service.
// It simulates the behavior of making API calls to LinkedIn.
// Service level

import { IGithubRepo } from '@/interfaces/api/github';
import { IMockResponse } from '@/interfaces/api/linkedin';

export const shareLinkToLinkedin = (repo: IGithubRepo): Promise<IMockResponse> => {
  const successRate = 0.95;

  return new Promise((resolve, reject) => {
    // Simulate a successful response in 95% of cases
    if (Math.random() < successRate) {
      const IMockResponse: IMockResponse = {
        success: true,
        data: {
          repoId: repo.id,
          message: 'Mock LinkedIn API success',
        },
      };
      resolve(IMockResponse);
    } else {
      const mockError: IMockResponse = {
        success: false,
        error: {
          message: 'Mock LinkedIn API error',
        },
      };
      reject(mockError);
    }
  });
};
