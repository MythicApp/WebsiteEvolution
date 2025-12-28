export { default } from '@/components/pages/releases/RawRelease'
import { fetchWithCache } from '@/utils/fetchData';


export async function getStaticProps({ params }) {
  const { tag } = params;
  const data = await fetchWithCache(
    'releases',
    'https://api.github.com/repos/MythicApp/Mythic/releases'
  );

  let release = null;
  if (Array.isArray(data)) {
    release = data.find((release) => release.tag_name === tag) || null;
  }

  return {
    props: {
      release,
      fetchError: !Array.isArray(data),
    },
  };
}


export async function getStaticPaths() {
  const data = await fetchWithCache(
    'releases',
    'https://api.github.com/repos/MythicApp/Mythic/releases'
  );
  let paths = [];
  if (Array.isArray(data)) {
    paths = data.map((release) => ({ params: { tag: release.tag_name } }));
  }
  return {
    paths,
    fallback: false,
  };
}
