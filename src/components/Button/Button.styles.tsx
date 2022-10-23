import { ButtonProps } from './Button';
import cx from 'classnames';

export const styles = ({ disable, variant, shadow, size, full, capitalize }: ButtonProps) => {
  return cx({
    // default style using default props
    'rounded transition-all duration-75 ease-in-out focus:outline-none font-semibold text-opacity-90 tracking-wide text-white':
      true,

    // button style based on variant
    'bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 active:scale-95':
      variant === 'primary' && !disable,

    'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 focus:ring-4 focus:ring-orange-100 active:scale-95':
      variant === 'warning' && !disable,

    'bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-4 focus:ring-red-100 active:scale-95':
      variant === 'danger' && !disable,

    'text-gray-700 border bg-white hover:bg-slate-50 active:bg-slate-100 active:bg-opacity-70 focus:ring-4 focus:ring-slate-100 active:scale-95':
      variant === 'white' && !disable,

    // button style based on shadow and variant
    'shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-200': shadow && variant === 'primary',
    'shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-200': shadow && variant === 'warning',
    'shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-200': shadow && variant === 'danger',
    'shadow-lg shadow-slate-200 hover:shadow-xl hover:shadow-slate-200': shadow && variant === 'white',

    // button style based on disabled state
    'bg-indigo-400 hover:bg-indigo-400 active:bg-indigo-400': disable && variant === 'primary',
    'bg-orange-400 hover:bg-orange-400 active:bg-orange-400': disable && variant === 'warning',
    'bg-red-400 hover:bg-red-400 active:bg-red-400': disable && variant === 'danger',
    'bg-slate-50 hover:bg-slate-50 active:bg-slate-50 text-gray-400 border': disable && variant === 'white',

    'uppercase tracking-widest': capitalize,

    // button style based on size
    'px-4 py-2 text-sm': size === 'sm',
    'px-5 py-2 text-base': size === 'md',
    'px-6 py-2 text-xl': size === 'lg',

    // button style based on whether the button should take full width or not
    'w-full': full,
  });
};
