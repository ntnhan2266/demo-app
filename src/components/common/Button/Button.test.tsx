import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/common/Button';
import renderer from 'react-test-renderer';

describe('Button component', () => {
  test('should match the snapshot', () => {
    const tree = renderer.create(<Button label='OK' />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders button with label', () => {
    render(<Button label='Click me' />);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  test('handles onClick event', () => {
    const onClickMock = jest.fn();
    render(<Button label='Click me' onClick={onClickMock} />);
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });

  test('applies primary variant styles', () => {
    render(<Button label='Primary' variant='primary' />);
    const button = screen.getByText('Primary');
    expect(button).toHaveClass('bg-indigo-500');
  });

  test('applies secondary variant styles', () => {
    render(<Button label='Secondary' variant='secondary' />);
    const button = screen.getByText('Secondary');
    expect(button).toHaveClass('bg-gray-500');
  });

  test('applies success variant styles', () => {
    render(<Button label='Success' variant='success' />);
    const button = screen.getByText('Success');
    expect(button).toHaveClass('bg-green-500');
  });

  test('applies danger variant styles', () => {
    render(<Button label='Danger' variant='danger' />);
    const button = screen.getByText('Danger');
    expect(button).toHaveClass('bg-red-500');
  });

  test('applies ghost variant styles', () => {
    render(<Button label='Ghost' variant='ghost' />);
    const button = screen.getByText('Ghost');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('focus:outline-none');
  });

  test('applies fullWidth styles', () => {
    render(<Button label='Full Width' fullWidth />);
    const button = screen.getByText('Full Width');
    expect(button).toHaveClass('w-full');
  });

  test('applies disabled styles', () => {
    render(<Button label='Disabled' disabled />);
    const button = screen.getByText('Disabled');
    expect(button).toHaveAttribute('disabled');
    expect(button).toHaveClass('cursor-not-allowed');
    expect(button).toHaveClass('opacity-50');
  });
});
