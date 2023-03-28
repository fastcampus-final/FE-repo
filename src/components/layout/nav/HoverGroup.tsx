import React from 'react';
import { useState } from 'react';
import NavList from './NavList';

const HoverGroup = ({ hovergroup }: { hovergroup: any }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseOut={() => {
        setHover(false);
      }}
      onMouseOver={() => {
        setHover(true);
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
