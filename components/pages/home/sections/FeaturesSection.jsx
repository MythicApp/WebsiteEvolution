import { Download } from 'react-feather';
import Link from 'next/link';
import Tile from '@/components/common/Tile';
import Typography from '@/components/common/Typography';
import { Grid, GridItem, Section, Stack } from '@/components/common/layout';
import HighlightedText from '@/components/common/HighlightedText';
import Image from "next/image";
import React from "react";
import { useSite } from '@/components/common/Site';

const FeaturesSection = () => {
  const { colorScheme = "light" } = useSite();
  return (
    <Section contained="lg" gutterBottom>
      <Stack style={{ textAlign: 'center', marginBottom: 48 }}>
        <Typography variant="headline">Friends gaming without you?</Typography>
        <br />
        <Typography variant="headline">
          <HighlightedText>Mythic fixes that.</HighlightedText>
        </Typography>
      </Stack>
      <Grid columns={{ xs: 1, md: 2, lg: 3 }} gap>
        <GridItem as={Tile} width={{xs: 1, lg: 2}}>
          <Stack direction='horizontal' gap={2}>
            <Stack direction='vertical' gap={2}>
              <Typography variant="eyebrow">Plenty of games, <HighlightedText>one place.</HighlightedText></Typography>
              <Typography variant="body">
                Mythic brings your entire game library together, regardless of whether they&apos;re macOS games, Windows® games, Epic games, manually downloaded games, or otherwise.
                <br />
                <br />
                Launch, manage, and customise your play experience without juggling a million apps.
              </Typography>
            </Stack>
            <Image
              key={colorScheme}
              className="feature-image-hover"
              width={481}
              height={282}
              src={`/mythic-library-grid-${colorScheme}.avif`}
              alt="Mythic screenshot"
              style={{ height: 'auto', objectFit: 'contain' }}
            />
          </Stack>
        </GridItem>
        <GridItem as={Tile} height={{xs: 1, lg: 2}}>
          <Stack direction='vertical' gap={2}>
            <Typography variant="eyebrow">Import <HighlightedText>everything</HighlightedText>.</Typography>
            <Typography variant="body">
              Import games from existing launchers and local installations in mere minutes.
              Mythic will automatically organise, and prepare them for launching — no assembly required.
            </Typography>
            <Image
              key={colorScheme}
              className="feature-image-hover"
              width={481}
              height={282}
              src={`/mythic-epicgameimportview-${colorScheme}.avif`}
              alt="Mythic screenshot"
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </Stack>
        </GridItem>
        <GridItem as={Tile} width={{ xs: 1, md: 2, lg: 2 }} style={{background: 'linear-gradient(180deg, #7541FF, #5412FF)', color: 'white'}}>
          <Stack direction='horizontal' gap={2}>
            <Download />
            <Stack direction='vertical' gap={2}>
              <Typography variant="eyebrow" style={{color: 'white'}}>What&apos;re you still waiting for?</Typography>
              <Typography variant="body" style={{color: 'white'}}>
                <Link href="/download">Download Mythic</Link> today, and join the revolution in gaming on macOS.
              </Typography>
            </Stack>
            {/*
            <video
              src="/mythic-library-grid-dark.mov"
              autoPlay
              muted
              loop
              playsInline
            />
            */}
          </Stack>
        </GridItem>
        <GridItem as={Tile}>
          <Stack gap={2}>
            <Typography variant="eyebrow"><HighlightedText>Powerful</HighlightedText> game controls.</Typography>
            <Typography variant="body">
              Mythic minimises time wasted fiddling with techy settings, and terminal hacks.
              <br />
              <br />
              The intuitive game settings view lets you tweak launch arguments, verify file integrity, and more with just a few clicks.
            </Typography>
            <Image
              key={colorScheme}
              className="feature-image-hover"
              width={481}
              height={282}
              src={`/mythic-gamesettingsview-${colorScheme}.avif`}
              alt="Mythic screenshot"
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </Stack>
        </GridItem>
        <GridItem width={{ xs: 1, md: 2, lg: 2 }} as={Tile}>
          <Stack gap={2}>
            <Typography variant="eyebrow">Less managing, <HighlightedText>more gaming.</HighlightedText></Typography>
            <Typography variant="body">
              Download, update, and install games from multiple storefronts with ease.
            </Typography>
            <Image
              key={colorScheme}
              className="feature-image-hover"
              width={481}
              height={282}
              src={`/mythic-operations-demo-${colorScheme}.avif`}
              alt="Mythic screenshot"
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </Stack>
        </GridItem>
        <GridItem as={Tile} width={{ xs: 1, lg: 1 }}>
          <Stack gap={2}>
            <Typography variant="eyebrow">Containers for dummies.</Typography>
            <Typography variant="body">
              Create multiple containers of Windows® directly within Mythic, and choose to keep some games isolated from others.
            </Typography>
            <Image
              key={colorScheme}
              className="feature-image-hover"
              width={481}
              height={282}
              src={`/mythic-containerconfirgurationview-${colorScheme}.avif`}
              alt="Mythic screenshot"
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </Stack>
        </GridItem>
        <GridItem as={Tile} width={{ xs: 1, md: 1, lg: 1 }}>
          <Stack gap={2}>
            <Typography variant="eyebrow">It just works!</Typography>
            <Typography variant="body">
              Mythic&apos;s onboarding experience guides your through setting up the application, swiftly.
            </Typography>
            <Image
              key={colorScheme}
              className="feature-image-hover"
              width={481}
              height={282}
              src={`/mythic-onboarding-engineinstall-${colorScheme}.avif`}
              alt="Mythic screenshot"
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </Stack>
        </GridItem>
        <GridItem as={Tile} style={{height: '100%'}} >
          <Stack gap={2}>
            <Typography variant="eyebrow">Open-source, <HighlightedText>open season.</HighlightedText></Typography>
            <Typography variant="body">
              Check out Mythic&apos;s Discord community!
            </Typography>
            <iframe
              src={`https://discord.com/widget?id=1154998702650425397&theme=${colorScheme}`}
              width="100%"
              height="224px"
              allowtransparency="true"
              frameborder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts">
            </iframe>
          </Stack>
        </GridItem>
      </Grid>
    </Section>
  );
}

export default FeaturesSection;
