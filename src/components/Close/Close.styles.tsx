import cx from 'classnames';
import { CloseProps } from './Close';

export const closeSvgStyles = ({ size }: CloseProps) => {
  return cx({
    'text-gray-500 hover:text-gray-600 transition-all': true,
    'h-4 w-4': size === 'sm',
    'h-5 w-5': size === 'md',
    'h-6 w-6': size === 'lg'
  });
};

export const closeBtnStyles = () => {
  return cx('hover:bg-slate-100 hover:bg-opacity-80 transition-colors rounded-md p-1');
};
