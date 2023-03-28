import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../api/instance';

const getLike = async () => {
  // const { data } = await instance.get('https://example.com/like');
  // return data.data;
};

const useLikeList = () => {
  const { data } = useQuery(['likeList'], () => getLike());
  return { likeList: data };
};

export default useLikeList;
