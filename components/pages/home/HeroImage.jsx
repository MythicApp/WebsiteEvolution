import styled, { css, keyframes } from "styled-components"
import Image from "next/image";
import HardwareLockup from "./HardwareLockup";
import { useSite } from '@/components/common/Site';
import { mediaQueries } from '@/styles/breakpoints';

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const scaleBlurIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.75);
    filter: blur(32px);
  }
  to {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
`;

const SceneWrap = styled.div`
  position: relative;
  animation: ${scaleBlurIn} 500ms 750ms cubic-bezier(0.0, 0.0, 0.2, 1);
  animation-fill-mode: both;
  transform-origin: bottom center;
  margin-top: 3%;
  img {
    position: relative;
    width: 100%;
    height: auto;
  }
`;
const ImageWrap = styled.div`
  position: relative;
  max-width: 988px;
  margin: 0 auto;
  z-index: 2;
  @media ${mediaQueries.md} {
    width: 82%;
  }
`;

const colorFlairPiece = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;

  @media ${mediaQueries.md} {
    width: 20vw;
    height: 20vw;
    filter: blur(10vw);
  }

  border-radius: 50%;
  background: #7541FF;
  transform-origin: bottom center;
`;
const ColorFlair = styled.div`
  ${colorFlairPiece}
  animation: ${rotate} 5000ms linear infinite;
  filter: blur(100px);
  &:before {
    content: "";
    display: block;
    ${colorFlairPiece};
    background: #5412FF;
    top: 50%;
    left: auto;
    right: 50%;
  }
  &:after {
    content: "";
    display: block;
    ${colorFlairPiece};
    background: var(--label-tertiary-color);
    top: 50%;
    left: 50%;
  },
`;
const ColorFlair1 = styled(ColorFlair)`
  && {
    top: 0px;
    left: 100px;
    animationDuration: 4000ms;
  }
`;
const ColorFlair2 = styled(ColorFlair)`
  && {
    top: -100px;
    left: calc(50% - 100px);
    animation-duration: 6000ms;
    animation-direction: reverse;
  }
`;
const ColorFlair3 = styled(ColorFlair)`
  && {
    top: 0px;
    left: auto;
    right: 100px;
    animation-duration: 5000ms;
  }
`;
const StyledHardwareLockup = styled(HardwareLockup)`
  margin-top: -45%;
  position: relative;
  z-index: 1;
  @media ${mediaQueries.md} {
    margin-top: -37%;
  }
`;

const HeroImage = ({ percentage }) => {
  const { colorScheme = "light", breakpoint } = useSite();
  const adjustedPercentage = (Math.min(Math.max(percentage - ( breakpoint === 'xs' ? .2 : 0), 1), 1.2) - 1) * 5;
  
  const imageScale = Math.max(0.7, 1.2 - adjustedPercentage * 0.7);
  const imageTranslateY = adjustedPercentage * 6;

  return (
    <SceneWrap>
      <ColorFlair1 />
      <ColorFlair2 />
      <ColorFlair3 />
      <ImageWrap style={{ transform: `translateY(${imageTranslateY}%) scale(${imageScale})` }}>
        <Image
          width={721.5}
          height={423}
          src={`/mythic-window-${colorScheme}.png`}
          alt="Mythic screenshot"
        /> 
      </ImageWrap>
      <StyledHardwareLockup style={{ opacity: adjustedPercentage, transform: `translateY(-${adjustedPercentage * 15}%)  scale(${1 + (1 - adjustedPercentage) * -.1})` }} />
    </SceneWrap>
  )
}

export default HeroImage;
