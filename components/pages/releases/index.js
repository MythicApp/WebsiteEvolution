import React from 'react';
import styled from 'styled-components';
import { Section } from '@/components/common/layout';
import Typography from '@/components/common/Typography';
import Button from '@/components/common/Button';
import { Menu, MenuItem } from '@/components/common/Menu';
import { ChevronDown } from 'react-feather';
import { useRouter } from 'next/router';
import HighlightedText from '@/components/common/HighlightedText';
import Release from './Release';

const HeroSection = styled(Section)`
  text-align: center;
`;
const HeroIntro = styled(Typography)`
  width: 75%;
  margin-left: auto;
  margin-right: auto;
`;
export default function ReleasesPage({ releases, appcastDownloadMap = {} }) {
  const router = useRouter();
  const hasReleases = Array.isArray(releases) && releases.length > 0;
  return (
    <>
      <HeroSection contained gutterY={12}>
        <Typography variant="headline-elevated" as="h1">
          <HighlightedText>Releases</HighlightedText>
        </Typography>
        <HeroIntro variant="intro-elevated" gutter>
          See what&apos;s shipping in each Mythic release.
          <br />
          For full notes, visit the{' '}
          <a href="https://www.github.com/MythicApp/Mythic/releases">
            Mythic Release Notes
          </a>
          .
        </HeroIntro>
        {hasReleases ? (
          <Menu
            placement="bottom"
            trigger={() => (
              <Button>
                Jump to version
                <ChevronDown />
              </Button>
            )}
          >
            {releases.map((release) => (
              <MenuItem
                key={`jump-to-${release.id}`}
                onClick={() => {
                  router.replace(`#${release.name}`);
                }}
              >
                {release.name}
              </MenuItem>
            ))}
          </Menu>
        ) : null}
      </HeroSection>
      {hasReleases ? (
        releases.map((release, i) => (
          <Release
            release={release}
            latest={i === 0}
            key={release.id}
            downloadUrl={appcastDownloadMap?.[release.id] ?? null}
          />
        ))
      ) : (
        <Section contained gutterY={8}>
          <Typography variant="body-elevated" color="tertiary" style={{ textAlign: 'center' }}>
            Releases currently unavailable, please try again later.
          </Typography>
        </Section>
      )}
    </>
  );
}
