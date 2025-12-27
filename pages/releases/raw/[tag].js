import { fetchWithCache } from '@/utils/fetchData';
export { default } from '@/components/pages/releases/RawRelease'

export async function getStaticProps({ params }) {
  const { tag } = params;
  const data = await fetchWithCache(
    'releases',
    'https://api.github.com/repos/MythicApp/Mythic/releases'
  );

  const releases = Array.isArray(data) ? data : [];
  return {
    props: {
      release: releases.find((release) => release.tag_name === tag) || null,
    },
    revalidate: 60 * 30, // 30 minutes
  };
}

export async function getStaticPaths() {
  const data = await fetchWithCache(
    'releases',
    'https://api.github.com/repos/MythicApp/Mythic/releases'
  );
  const releases = Array.isArray(data) ? data : [];
  const paths = releases.map((release) => ({ params: { tag: release.tag_name } }));

  return {
    paths,
    fallback: false,
  };
}
