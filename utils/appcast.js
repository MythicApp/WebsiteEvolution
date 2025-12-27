export const APPCAST_URL = 'https://dl.getmythic.app/updates/update.xml';

export function parseAppcastAll(text) {
  if (typeof text !== 'string' || !text) return [];

  const itemMatches = Array.from(text.matchAll(/<item[\s\S]*?<\/item>/g));
  const releases = itemMatches
    .map((m) => m[0])
    .map((snippet) => {
      const title = (snippet.match(/<title>([^<]+)<\/title>/) || [])[1] ?? null;
      const versionTagRaw =
        (snippet.match(/<sparkle:version>([^<]+)<\/sparkle:version>/) || [])[1] ??
        (snippet.match(/sparkle:version="([^"]+)"/) || [])[1] ??
        null;
      const shortVersion =
        (snippet.match(/<sparkle:shortVersionString>([^<]+)<\/sparkle:shortVersionString>/) || [])[1] ??
        (snippet.match(/sparkle:shortVersionString="([^"]+)"/) || [])[1] ??
        null;
      const minimumSystemVersion =
        (snippet.match(/<sparkle:minimumSystemVersion>([^<]+)<\/sparkle:minimumSystemVersion>/) || [])[1] ??
        (snippet.match(/sparkle:minimumSystemVersion="([^"]+)"/) || [])[1] ??
        null;
      const enclosure = (snippet.match(/<enclosure[^>]*url="([^"]+)"/) || [])[1] ?? null;

      return {
        title,
        versionTagRaw,
        versionNumber: versionTagRaw ? parseInt(versionTagRaw, 10) : null,
        shortVersion,
        enclosure,
        minimumSystemVersion,
      };
    })
    .filter((r) => r.title && r.versionNumber && r.enclosure)
    .sort((a, b) => b.versionNumber - a.versionNumber);

  return releases;
}

export function parseAppcast(text) {
  const releases = parseAppcastAll(text);
  return releases[0] ?? null;
}
