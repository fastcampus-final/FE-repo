import { IHoverGroup } from '@/interfaces/navText';
import React from 'react';
import { useState } from 'react';
import NavList from './NavList';

const HoverGroup = ({ hovergroup }: { hovergroup: IHoverGroup }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseOut={() => {
        setHover(false);
        // console.log('flexgroup:un-hover');
      }}
      onMouseOver={() => {
        setHover(true);
        // console.log('flexgroup:hover');
      }}
    >
      {hovergroup.href === undefined && (
        <div>
          <div>{hovergroup.title}</div>
          {hover && (
            <ul>
              <NavList text={hovergroup.data} />
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default HoverGroup;
