import React from 'react';
import { Link } from 'react-router-dom';
import cs from 'classnames';
import { ROUTE_PATH } from '@/constants/route-path';

interface IProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
}

const AppLogo: React.FC<IProps> = ({ size = '4xl' }: IProps): React.ReactElement => {
  const logoClasses = cs('text-black font-bold font-comfortaa', {
    'text-sm': size === 'sm',
    'text-md': size === 'md',
    'text-lg': size === 'lg',
    'text-xl': size === 'xl',
    'text-2xl': size === '2xl',
    'text-3xl': size === '3xl',
    'text-4xl': size === '4xl',
    'text-5xl': size === '5xl',
    'text-6xl': size === '6xl',
    'text-7xl': size === '7xl',
    'text-8xl': size === '8xl',
    'text-9xl': size === '9xl',
  });

  return (
    <Link to={ROUTE_PATH.INDEX} className={logoClasses}>
      &beta;eta
    </Link>
  );
};

export default AppLogo;
