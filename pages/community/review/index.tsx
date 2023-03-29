import { instance } from '@/api/instance';
import React, { useEffect, useState } from 'react';
import data from '@/dummydata/communityReview.json';
import { IReview } from '@/interfaces/community';

const Review = () => {
  const [reviewData, setReviewData] = useState<Array<IReview>>([]);
  useEffect(() => {
    const getData = async () => {
      await setReviewData(data.content);
    };
    getData();
  }, []);
  console.log(reviewData);
  return <div>Review</div>;
};

export default Review;
