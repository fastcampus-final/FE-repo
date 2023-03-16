import React from 'react';
import styled, { css } from 'styled-components';

const VARIANTS = {
  blue: css`
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
    transition: 0.3s ease all;
    border: none;
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  `,
  white: css`
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.white};
    transition: 0.3s ease all;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    &:hover {
      color: ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.primary};
    }
  `,
  disbled: css`
    color: #808080;
    background-color: #d8d9d9;
    border: none;
  `,
  transparent: css`
    color: black;
    background-color: transparent;
    border: none;
  `,
};

interface Props {
  variant?: string;
  type?: 'button' | 'submit' | 'reset';
  width?: string;
  height?: string;
  isDisabled?: boolean;
  scale?: string;
  borderRadius?: string;
  padding?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
}

const Button = ({
  variant = 'blue',
  type = 'button',
  width = 'fit-content',
  height = 'fit-content',
  isDisabled = false,
  scale = '',
  borderRadius = '',
  padding = '',
  children,
  onClick,
}: Props) => {
  const variantStyle = VARIANTS[variant];

  return (
    <StyledButton
      variantStyle={variantStyle}
      type={type}
      width={width}
      height={height}
      disabled={isDisabled}
      scale={scale}
      borderRadius={borderRadius}
      padding={padding}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{
  width: string;
  height: string;
  scale: string;
  borderRadius: string;
  padding: string;
}>`
  ${(props) => props.variantStyle}

  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ borderRadius }) => borderRadius};
  padding: ${({ padding }) => padding};
  text-align: center;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    opacity: 1;
    cursor: default;
  }
  &:hover {
    scale: ${({ scale }) => scale};
  }
`;
