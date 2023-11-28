import React, { FC } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

/**
 * withLayout Higher Order Component (HOC)
 * Wraps a component with the Nav and Footer components
 * @param {React.ComponentType} WrappedComponent - Component to wrap
 */
const withLayout = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): FC<P> => {
  return props => (
    <>
      <Nav />
      <main className="min-h-screen flex-grow pt-16">
        <WrappedComponent {...(props as P)} />
      </main>
      <Footer />
    </>
  );
};

export default withLayout;
