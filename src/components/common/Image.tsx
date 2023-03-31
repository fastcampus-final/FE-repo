import React from 'react';
import styled from '@emotion/styled';

interface Prop {
  src: string;
  width?: string;
  height?: string;
  mediaWidth?: string;
  mediaHeight?: string;
  borderRadius?: string;
  alt: string;
  padding?: string;
  cursorPointer?: boolean;
  isCover?: boolean;
  onClick?: () => void;
}

const Image = ({
  src,
  width,
  height,
  mediaWidth,
  mediaHeight,
  borderRadius,
  alt,
  padding,
  cursorPointer,
  isCover,
  onClick,
}: Prop) => {
  return (
    <StyledImage
      src={src}
      width={width}
      height={height}
      mediaWidth={mediaWidth}
      mediaHeight={mediaHeight}
      borderRadius={borderRadius}
      alt={alt}
      padding={padding}
      cursorPointer={cursorPointer}
      isCover={isCover}
      onClick={onClick}
    />
  );
};

export default Image;

const StyledImage = styled.img<Prop>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  border-radius: ${({ borderRadius }) => borderRadius};
  cursor: ${({ cursorPointer }) => (cursorPointer ? 'pointer' : '')};
  object-fit: ${({ isCover }) => (isCover ? 'cover' : '')};
  @media (max-width: 576px) {
    width: ${({ mediaWidth }) => mediaWidth};
    height: ${({ mediaHeight }) => mediaHeight};
  }
`;
