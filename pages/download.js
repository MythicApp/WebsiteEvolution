import { APPCAST_URL, parseAppcast } from '@/utils/appcast';
export { default } from '@/components/pages/download';

export async function getStaticProps() {
  let latest = null;
  try {
    const res = await fetch(APPCAST_URL);
    const text = res.ok ? await res.text() : null;
    latest = parseAppcast(text);
  } catch (err) {
    // swallow to allow page render with manual link fallback
  }

  return {
    props: {
      versionNumber: latest?.versionNumber ?? null,
      downloadUrl: latest?.enclosure ?? null,
    },
    revalidate: 60 * 30, // 30 minutes
  };
}
