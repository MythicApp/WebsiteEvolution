import { fileExists, readFile, writeFile } from './file';
import path from 'path';

export const getCachePath = (id) => {
  const pathName = `./build/cache/${id}.json`;

  return path.resolve(process.cwd(), pathName);
};

export const fetchWithCache = async (id, req) => {
  const pathName = getCachePath(id);

  const isRateLimitResponse = (value) =>
    value &&
    typeof value === 'object' &&
    typeof value.message === 'string' &&
    value.message.toLowerCase().includes('api rate limit exceeded');

  if (fileExists(pathName)) {
    try {
      const file = await readFile(pathName);
      if (!isRateLimitResponse(file)) {
        return file;
      }
    } catch (err) {
      // Fall through to re-fetch on parse or read errors
    }
  }

  const res = await fetch(req);
  const result = await res.json();

  if (res.ok && !isRateLimitResponse(result)) {
    await writeFile(pathName, result);
    return result;
  }

  // If the response is not ok or was rate limited, avoid caching the error and
  // surface a safe fallback to callers.
  return isRateLimitResponse(result) ? null : result;
};

export const fetchGitHubUser = async (username) => {
  const url = `https://api.github.com/users/${username}`;

  return await fetchWithCache(`github-users/${username}`, url);
};
