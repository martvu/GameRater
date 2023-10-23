import React, { FC } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const withLayout = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): FC<P> => {
  return props => (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <div className="flex-grow">
        <WrappedComponent {...(props as P)} />
      </div>
      <Footer />
    </div>
  );
};

export default withLayout;
