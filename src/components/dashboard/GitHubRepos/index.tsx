import React, { useState } from 'react';
import Input from '@/components/common/Input';
import { IGithubRepo } from '@/interfaces/api/github';
import { getListReposByUsername } from '@/services/github';
import Button from '@/components/common/Button';

const GitHubRepos: React.FC = (): React.ReactElement => {
  const [repos, setRepos] = useState<Array<IGithubRepo>>([]);
  const [page, setPage] = useState(1);
  const [username, setUsername] = useState<string>('adamwathan');
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (fetchPage: number) => {
    if (loading) return;
    setError(null); // Reset error on new fetch
    setLoading(true);

    try {
      const res = await getListReposByUsername({
        username,
        page: fetchPage,
      });
      setHasMore(res.length > 0);
      if (fetchPage === 1) {
        setRepos(res);
      } else {
        setRepos((prev) => [...prev, ...res]);
      }
      setPage((prev) => prev + 1);
    } catch (error: unknown) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.'); // Set error state
    } finally {
      setLoading(false);
    }
  };

  const fetchInitialData = async () => {
    await fetchData(1);
  };

  const fetchMoreData = async () => {
    await fetchData(page);
  };

  return (
    <div>
      <h1 className='text-lg font-bold mb-4'>Github Repos</h1>
      <div>
        <Input
          placeholder='Enter your Github username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className='flex justify-center'>
          <Button onClick={fetchInitialData} label='Get repos' type='button' />
        </div>
      </div>

      {repos.length > 0 && (
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                Repo name
              </th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                Created at
              </th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                Language
              </th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo) => (
              <tr key={repo.id}>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <a className='hover:underline' href={repo.gitUrl}>
                    {repo.name}
                  </a>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{repo.createdAt}</td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{repo.language}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {loading && <p className='text-center'>Loading...</p>}
      {error && <p>{error}</p>}

      {hasMore && !loading && repos.length > 0 && (
        <div className='flex justify-center'>
          <Button onClick={fetchMoreData} label='Load more' type='button' />
        </div>
      )}
    </div>
  );
};

export default GitHubRepos;
