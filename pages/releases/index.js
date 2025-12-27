import { fetchWithCache } from '@/utils/fetchData';
import { APPCAST_URL, parseAppcastAll } from '@/utils/appcast';
export { default } from '@/components/pages/releases';

export async function getStaticProps() {
  const data = await fetchWithCache(
    'releases',
    'https://api.github.com/repos/MythicApp/Mythic/releases'
  );

  const releases = Array.isArray(data) ? data : [];

  let appcastReleases = [];
  try {
    const res = await fetch(APPCAST_URL);
    const text = res.ok ? await res.text() : null;
    appcastReleases = parseAppcastAll(text);
  } catch (err) {
    appcastReleases = [];
  }

  const normalize = (val) => {
    if (!val) return '';
    const str = String(val).trim();
    return str.startsWith('v') ? str.slice(1) : str;
  };

  const appcastDownloadMap = releases.reduce((acc, release) => {
    const tag = release.tag_name ?? '';
    const name = release.name ?? '';
    const candidateStrings = [tag, name].filter(Boolean);
    const normalizedCandidates = new Set(
      candidateStrings.map(normalize).filter(Boolean)
    );

    const matched = appcastReleases.find((item) => {
      const versionRaw = item.versionTagRaw ?? String(item.versionNumber ?? '');
      const shortVersion = item.shortVersion ?? item.title ?? '';

      const potentials = [
        versionRaw,
        normalize(versionRaw),
        shortVersion,
        normalize(shortVersion),
        item.title,
        normalize(item.title),
        item.versionNumber ? String(item.versionNumber) : '',
      ].filter(Boolean).map(normalize);

      return potentials.some((p) => normalizedCandidates.has(p));
    });

    acc[release.id] = matched?.enclosure ?? null;
    return acc;
  }, {});

  return {
    props: {
      releases,
      appcastDownloadMap,
    },
    revalidate: 60 * 30, // 30 minutes
  };
}
