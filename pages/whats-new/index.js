export { default } from '@/components/pages/releases';
import { fetchWithCache } from '@/utils/fetchData';

export async function getStaticProps() {
  const data = await fetchWithCache(
    'releases',
    'https://api.github.com/repos/MythicApp/Mythic/releases'
  );

  const releases = Array.isArray(data) ? data : [];

  return {
    props: {
      releases,
    },
  };
}
