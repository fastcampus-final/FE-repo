import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import HoverGroup from './HoverGroup';

interface IFlexGroup {
  title: string;
  data: IGroupData[];
}

interface IGroupData {
  title: string;
  href?: string;
  data?: IHrefGroup[];
}

interface IHrefGroup {
  title: string;
  href: string;
}

const FlexGroup = ({ flexgroup }: { flexgroup: IFlexGroup }) => {
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
      <div>{flexgroup.title}</div>
      {hover && (
        <ul
          onMouseOut={() => {
            setHover(false);
            console.log('flexgroup:un-hover');
          }}
        >
          {flexgroup.data.map((hoverGroup) => {
            return (
              <li key={hoverGroup.title}>
                {hoverGroup.data !== undefined ? (
                  <HoverGroup hovergroup={hoverGroup} />
                ) : (
                  <Link href={hoverGroup.href as string}>
                    <div>{hoverGroup.title}</div>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FlexGroup;
