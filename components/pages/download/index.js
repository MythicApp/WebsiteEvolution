import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Column, Row, Section, Stack } from '@/components/common/layout';
import Typography from '@/components/common/Typography';
import Image from 'next/image';
import Tile from '@/components/common/Tile';
import { mediaQueries } from '@/styles/breakpoints';
import config from '@/data/config';

const StepTile = styled(Tile)`
  overflow: hidden;
  aspect-ratio: 1/1;
  img {
    transform: translateX(-50%);
  }
  @media ${mediaQueries.md} {
    aspect-ratio: 16/7;
  }
  @media ${mediaQueries.sm} {
    aspect-ratio: 1/1;
    img {
      transform: translateX(-50%) translateY(-10%) scale(1.25);
    }
  }
  @media ${mediaQueries.xs} {
    aspect-ratio: 1/1;
    img {
      transform: translateX(-50%) translateY(10%) scale(0.9);
    }
  }
`;
const ProductIconWrap = styled.div`
  width: 128px;
  margin-left: auto;
  margin-right: auto;
`;
const StepNumber = styled.div`
  width: 1.75em;
  height: 1.75em;
  border-radius: 2.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border: 2.5px solid;
`;
const Download = styled.iframe`
  width: 0;
  height: 0;
  position: fixed;
  top: 100%;
  right: 100%;
  border: 0;
  background: transparent;
  opacity: 0;
`;

const APPCAST_URL = 'https://getmythic.app/appcast.xml';

function parseAppcast(text) {
  if (typeof text !== 'string' || !text) return null;

  const itemMatches = Array.from(text.matchAll(/<item[\s\S]*?<\/item>/g));
  const releases = itemMatches
    .map((m) => m[0])
    .map((snippet) => {
      const title = (snippet.match(/<title>([^<]+)<\/title>/) || [])[1] ?? null;
      const versionTag =
        (snippet.match(/<sparkle:version>([^<]+)<\/sparkle:version>/) || [])[1] ??
        (snippet.match(/sparkle:version="([^"]+)"/) || [])[1] ?? null;
      const enclosure = (snippet.match(/<enclosure[^>]*url="([^"]+)"/) || [])[1] ?? null;

      return {
        title,
        versionNumber: versionTag ? parseInt(versionTag, 10) : null,
        enclosure,
      };
    })
    .filter((r) => r.title && r.versionNumber && r.enclosure)
    .sort((a, b) => b.versionNumber - a.versionNumber);

  return releases[0] ?? null;
}

export default function DownloadPage({ downloadUrl }) {
  useEffect(() => {
    if (downloadUrl) {
      return;
    }

    let cancelled = false;

    const start = async () => {
      try {
        const res = await fetch(APPCAST_URL);
        const text = res.ok ? await res.text() : null;
        if (cancelled) return;
        const latest = parseAppcast(text);
        if (latest?.enclosure) {
          window.location.href = latest.enclosure;
        }
      } catch (err) {
        // silent fallback; manual link remains visible
      }
    };

    // mimic old 3-second countdown without UI change
    const timer = setTimeout(start, 3000);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [downloadUrl]);

  return (
    <>
      {downloadUrl && <Download src={downloadUrl} />}
      <Section contained gutterTop>
        <Row align="center" style={{ position: 'relative', zIndex: 1 }}>
          <Column width={{ md: 12, lg: 12 }}>
            <Stack gap={2} align="center">
              <ProductIconWrap>
                <Image
                  width={128}
                  height={128}
                  src="/product-icon.avif"
                  alt="Mythic product icon"
                />
              </ProductIconWrap>
              <Typography variant="headline-elevated">
                Thanks for downloading Mythic!
              </Typography>
              <Typography
                variant="intro-elevated"
                color="tertiary"
                gutterBottom
              >
                Your download will start automatically. If it didn&rsquo;t,{' '}
                <a
                  href={
                    downloadUrl ?? `${config.links.githubRepo}/releases/latest`
                  }
                  target="_blank"
                >
                  download manually
                </a>
                .
              </Typography>
            </Stack>
          </Column>
        </Row>
      </Section>
    </>
  );
}
