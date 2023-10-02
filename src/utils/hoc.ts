import React from 'react';

// Helper function to get the display name of a component
export const getDisplayName = <P>(WrappedComponent: React.ComponentType<P>): string => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};
