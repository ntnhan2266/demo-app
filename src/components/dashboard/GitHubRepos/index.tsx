import React, { useEffect, useState } from 'react';
import { LinkedinShareButton, LinkedinIcon } from 'react-share';
import Input from '@/components/common/Input';
import { IGithubRepo } from '@/interfaces/api/github';
import { getListReposByUsername } from '@/services/github';
import Button from '@/components/common/Button';
import { LOCALSTORAGE_KEY } from '@/constants/localstorage-key';
import { formatTime } from '@/utils/time';

const GitHubRepos: React.FC = (): React.ReactElement => {
  const [repos, setRepos] = useState<Array<IGithubRepo>>([]);
  const [page, setPage] = useState(1);
  const [username, setUsername] = useState<string>('');
  const [hasMore, setHasMore] = useState(true);
  const [shareCounts, setShareCounts] = useState<Record<string, number>>({}); // Track share counts
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShareSuccess = (repoId: number) => {
    setShareCounts((prevCounts) => {
      const newCounts = {
        ...prevCounts,
        [repoId]: (prevCounts[repoId] || 0) + 1,
      };

      localStorage.setItem(LOCALSTORAGE_KEY.SHARE_COUNTS, JSON.stringify(newCounts));

      return newCounts;
    });
  };
  const fetchData = async (fetchPage: number) => {
    if (loading) return;
    setError(null); // Reset error on new fetch

    if (!username) {
      setRepos([]);
      setHasMore(false);
      return;
    }

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
      setRepos([]);
      setHasMore(false);
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

  // Load share counts from localStorage on component mount
  useEffect(() => {
    const storedShareCounts = localStorage.getItem(LOCALSTORAGE_KEY.SHARE_COUNTS);
    if (storedShareCounts) {
      setShareCounts(JSON.parse(storedShareCounts) as Record<string, number>);
    }
  }, []);

  return (
    <div data-testid='github-repos'>
      <h1 className='text-2xl font-bold mb-8 uppercase'>Github Repos</h1>
      <div className='flex items-center gap-4'>
        <Input
          inputClasses='w-96'
          placeholder='Enter your Github username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              await fetchInitialData();
            }
          }}
        />
        <Button className='w-40' onClick={fetchInitialData} label='Load repos' type='button' />
      </div>

      {repos.length > 0 && (
        <table className='min-w-full leading-normal mt-16'>
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
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                Share count
              </th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'></th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo) => (
              <tr key={repo.id}>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <a target='_blank' rel='noreferrer' className='hover:underline' href={repo.htmlUrl}>
                    {repo.name}
                  </a>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  {formatTime(repo.createdAt, 'DD-MM-YYYY')}
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{repo.language}</td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <span>{shareCounts[repo.id] || 0}</span>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <LinkedinShareButton
                    beforeOnClick={() => handleShareSuccess(repo.id)}
                    title={repo.name}
                    summary={repo.description}
                    source={repo.htmlUrl}
                    url={repo.htmlUrl}
                  >
                    <LinkedinIcon size={32} />
                  </LinkedinShareButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {loading && <p className='text-center mt-4'>Loading...</p>}
      {error && <p className='mt-4 text-red-500'>{error}</p>}

      {hasMore && !loading && repos.length > 0 && (
        <div className='flex justify-center mt-4'>
          <Button onClick={fetchMoreData} label='Load more' type='button' />
        </div>
      )}
    </div>
  );
};

export default GitHubRepos;
