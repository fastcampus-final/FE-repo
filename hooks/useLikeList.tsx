import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getLike = async () => {
  const { data } = await axios.get('https://example.com/like');
  return data.data;
};

const useLikeList = () => {
  const { data, isLoading } = useQuery(['likeList'], () => getLike(), {
    staleTime: 10000,
  });
  return { likeList: data, isLoading };
};

export default useLikeList;
