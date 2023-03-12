import React from 'react';
import Head from 'next/head';
import useLikeList from '@/hooks/useLikeList';
import { GetServerSidePropsContext } from 'next';
import { ILike } from '@/interfaces/like';
import { instance } from './api/instance';

interface Props {
  posts: {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
}

export default function Home({ posts }: Props) {
  const { likeList } = useLikeList();

  return (
    <>
      <Head>
        <title>고투게더</title>
      </Head>
      <p>index페이지</p>
      {likeList?.content.map((item: ILike, idx: number) => (
        <p key={idx}>MSW: {item.title}</p>
      ))}
      {`SSR: ${posts.title}`}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data } = await instance.get('https://jsonplaceholder.typicode.com/posts/1');

  return {
    props: {
      posts: data,
    },
  };
}
