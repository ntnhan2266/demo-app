import React from 'react';
import { render } from '@testing-library/react';
import { getDisplayName } from '@/utils/hoc';

// Mock component for testing
const MockComponent: React.FC = () => <div>Hello, World!</div>;

describe('getDisplayName Function', () => {
  test('should return the display name of a component', () => {
    const displayName = getDisplayName(MockComponent);

    expect(displayName).toBe('MockComponent');
  });

  test('should return "AnonymousComponent" for a component without display name but have name', () => {
    const AnonymousComponent: React.FC = () => <div>Anonymous Component</div>;

    const displayName = getDisplayName(AnonymousComponent);

    expect(displayName).toBe('AnonymousComponent');
  });

  test('should return "Component" for a non-component input', () => {
    const notAComponent: any = 'not a component';

    const displayName = getDisplayName(notAComponent);

    expect(displayName).toBe('Component');
  });
});

// Testing the function in a React component
describe('getDisplayName in a React Component', () => {
  test('should display the component name in the rendered output', () => {
    const TestComponent: React.FC = () => {
      const displayName = getDisplayName(MockComponent);
      return <div>{displayName}</div>;
    };

    const { getByText } = render(<TestComponent />);

    expect(getByText('MockComponent')).toBeInTheDocument();
  });
});
