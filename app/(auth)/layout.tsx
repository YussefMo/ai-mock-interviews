import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return <div className='auth-layout'>{children}</div>;
}

export default Layout;
