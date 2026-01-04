import getMinimumSystemVersion from '@/utils/getMinimumSystemVersion';
import { APPCAST_URL, parseAppcast } from '@/utils/appcast';

export { default } from '@/components/pages/home';

export async function getStaticProps() {
  let latest = null;
  try {
    const res = await fetch(APPCAST_URL);
    const text = res.ok ? await res.text() : null;
    latest = parseAppcast(text);
  } catch (err) {
    // allow page to render without version metadata if fetch fails
  }

  const build = latest?.versionTagRaw ?? latest?.versionNumber ?? null;
  const shortVersion = latest?.shortVersion ?? latest?.title ?? null;
  let displayShortVersion = shortVersion;
  if (displayShortVersion && !/^v/i.test(displayShortVersion)) {
    displayShortVersion = `v${displayShortVersion}`;
  }
  const versionLabel = displayShortVersion && build
    ? `${displayShortVersion} (${build})`
    : displayShortVersion ?? (build ? String(build) : null);

  return {
    props: {
      versionNumber: versionLabel,
      minimumSystemVersion: latest?.minimumSystemVersion ?? getMinimumSystemVersion(latest?.title ?? ''),
    },
  };
}
