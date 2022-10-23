import cx from 'classnames';
import { TextFieldProps } from './TextField';

export const inputStyles = ({ error, disable, full }: TextFieldProps) => {
  return cx({
    'px-3 py-2 focus:outline-none rounded border transition-all duration-75': true,
    'hover:shadow-xl hover:shadow-slate-100': !disable,
    'focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100': !error,
    'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100': error,
    'w-full': full,
  });
};

export const spanStyles = ({ error }: TextFieldProps) => {
  return cx({
    'block text-sm pl-1': true,
    'text-gray-800': !error,
    'text-red-600': error,
  });
};
