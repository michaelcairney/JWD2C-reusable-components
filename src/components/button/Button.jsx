import React from 'react';
import styled from 'styled-components';

const StyledNavButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: ${({ height }) => height};
  width: ${({ width }) => width};

  background: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  padding: 9px;

  font-family: 'Roboto Condensed', sans-serif;
  font-size: 20px;
  text-align: center;

  cursor: pointer;
  transition: ${({ transition }) => transition};

  &:hover {
    ${({ customHoverCSS }) => customHoverCSS}
  }

  /* target all child components */
  > * {
    transition: ${({ transition }) => transition};
  }

  /* decrease size when below specified width */
  @media (max-width: ${({ mediaBreakpoint }) => mediaBreakpoint}) {
    height: ${({ mobileHeight }) => mobileHeight};
    width: ${({ mobileWidth }) => mobileWidth};
    font-size: 16px;
  }

  /* inject custom css option */
  ${({ customCSS }) => customCSS}
`;

const NavButton = ({
  text,
  height,
  width,
  mobileHeight,
  mobileWidth,
  mediaBreakpoint,
  backgroundColor,
  textColor,
  border,
  borderRadius,
  transition,
  customHoverCSS,
  customCSS,
}) => {
  return (
    <StyledNavButton
      height={height}
      width={width}
      mobileHeight={mobileHeight}
      mobileWidth={mobileWidth}
      mediaBreakpoint={mediaBreakpoint}
      backgroundColor={backgroundColor}
      textColor={textColor}
      border={border}
      borderRadius={borderRadius}
      transition={transition}
      customHoverCSS={customHoverCSS}
      customCSS={customCSS}
    >
      <div className="child">{text}</div>
    </StyledNavButton>
  );
};

export default NavButton;
