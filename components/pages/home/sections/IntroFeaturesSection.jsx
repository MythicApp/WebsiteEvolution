import { useMemo } from 'react';
import { Feather, GitHub, Info, Layout, Sliders, Tool, Zap } from 'react-feather';
import Tile from '@/components/common/Tile';
import Typography from '@/components/common/Typography';
import { Grid, GridItem, Section, Stack } from '@/components/common/layout';
import { useSite } from '@/components/common/Site';

const IntroFeaturesSection = () => {
  const { breakpoint } = useSite();

  const gap = useMemo(() => breakpoint === 'xs' ? 24 : 40, [breakpoint])
  
  return (
    <Section contained gutterBottom={20} variant="secondary">
      
    </Section>
  );
}

export default IntroFeaturesSection;
