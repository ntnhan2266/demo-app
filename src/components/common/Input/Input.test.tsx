import { render, screen } from '@testing-library/react';
import Input from '@/components/common/Input';
import renderer from 'react-test-renderer';

describe('Input component', () => {
  test('should match the snapshot', () => {
    const tree = renderer.create(<Input />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders input with label and placeholder', () => {
    render(<Input label='Username' placeholder='Enter your username' />);

    const labelElement = screen.getByText('Username');
    const inputElement = screen.getByPlaceholderText('Enter your username');

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  test('renders required indicator in the label', () => {
    render(<Input label='Email' required />);

    const labelElement = screen.getByText('Email');
    const requiredIndicator = screen.getByText('*');

    expect(labelElement).toContainElement(requiredIndicator);
  });
});
