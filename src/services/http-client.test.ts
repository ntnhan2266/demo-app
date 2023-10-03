import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createAxiosInstance from '@/services/http-client';
import { camelCaseKeys } from '@/utils/convert';

// Mock convert module
jest.mock('@/utils/convert', () => ({
  camelCaseKeys: jest.fn((data: unknown) => data) as jest.Mock, // Mock the camelCaseKeys function to return the same data
}));

describe('createAxiosInstance', () => {
  let axiosMock: MockAdapter;

  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.restore();
  });

  test('creates and configures an Axios instance with interceptors', async () => {
    // Mock a request to avoid actual HTTP calls during the test
    axiosMock.onGet('/example').reply(200, { snakeCaseKey: 'example response' });

    const baseURL = 'https://example.com';
    const headers = { 'Custom-Header': 'value' };

    const axiosInstance = createAxiosInstance({ baseURL, headers });

    // Make a request using the axios instance
    const response = await axiosInstance.get('/example');

    // Assertions
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ snakeCaseKey: 'example response' });

    // Check if the interceptors are applied
    // Assuming camelCaseKeys is called in your interceptor
    expect(camelCaseKeys).toHaveBeenCalledWith({ snakeCaseKey: 'example response' });
  });

  test('handles request error', async () => {
    // Mock an error response
    axiosMock.onGet('/error').networkError();

    const baseURL = 'https://example.com';
    const axiosInstance = createAxiosInstance({ baseURL });

    // Make a request that results in an error
    await expect(axiosInstance.get('/error')).rejects.toThrow('Network Error');
  });
});
