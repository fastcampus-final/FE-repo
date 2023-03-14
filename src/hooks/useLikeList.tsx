import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getLike = async () => {
  const { data } = await axios.get('https://example.com/like');
  return data.data;
};

const useLikeList = () => {
  const { data } = useQuery(['likeList'], () => getLike());
  return { likeList: data };
};

export default useLikeList;
