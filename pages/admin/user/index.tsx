import withAuth from '@/components/common/PrivateRouter';
import React from 'react';

const User = () => {
  return <div>User</div>;
};

export default withAuth(User);
