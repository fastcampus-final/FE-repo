import React from 'react';
import { useState } from 'react';
import NavList from './NavList';
interface IFlexGroup {
  title: string;
  data: IFlexAreaGroupData[];
}
interface IFlexAreaGroupData {
  title: string;
  href: string;
}

const HoverGroup = ({ hovergroup }: { hovergroup: IFlexGroup }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseOut={() => {
        setHover(false);
        console.log('flexgroup:un-hover');
      }}
      onMouseOver={() => {
        setHover(true);
        console.log('flexgroup:hover');
      }}
    >
      <div>
        <div>{hovergroup.title}</div>
        {hover && (
          <ul>
            <NavList text={hovergroup.data} />
          </ul>
        )}
      </div>
    </div>
  );
};

export default HoverGroup;
