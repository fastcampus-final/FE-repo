import React from 'react';
import styled from '@emotion/styled';

interface Prop {
  src: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  alt: string;
  padding?: string;
  cursorPointer?: boolean;
  onClick?: () => void;
}

const Image = ({
  src,
  width,
  height,
  borderRadius,
  alt,
  padding,
  cursorPointer,
  onClick,
}: Prop) => {
  return (
    <StyledImage
      src={src}
      width={width}
      height={height}
      borderRadius={borderRadius}
      alt={alt}
      padding={padding}
      cursorPointer={cursorPointer}
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
`;
