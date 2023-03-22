import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import HoverGroup from './HoverGroup';

interface IFlexGroup {
  title: string;
  data: IGroupData[] | IHrefGroup[];
}

interface IGroupData {
  title: string;
  data: IHrefGroup[];
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
                {(hoverGroup as IGroupData) && <HoverGroup hovergroup={hoverGroup as IGroupData} />}
                {(hoverGroup as IHrefGroup) && (
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
